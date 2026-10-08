---
sidebar_label: 'Challenge: Misplaced Signature File'
---

# Challenge: Misplaced Signature File

**Category:** Observability Failures · **Difficulty:** 4 stars

## Task

The goal was to access a misplaced SIEM signature file in my own Juice Shop lab. A SIEM signature describes patterns used to detect suspicious events in logs. Exposing such a file can reveal what security monitoring looks for.

I filtered the scoreboard for unsolved four-star challenges. To understand what a SIEM signature file might contain, I looked at [SigmaHQ's rule repository](https://github.com/SigmaHQ/sigma). It showed me that detection rules can be written as YAML files for use with SIEM systems. That reminded me of my earlier FTP investigation: `suspicious_errors.yml` was visible in the browser's `/ftp` listing, so I tried to open it. The `.yml` extension was my clue; I did not assume the Juice Shop file was itself a Sigma rule.

## Tests

I intercepted the file request with Burp Intercept and sent it to Repeater. I changed the request path to investigate why the visible file could not be downloaded.

| Test | Observed response | What I learned |
| --- | --- | --- |
| Request `suspicious_errors.yml` directly | `403 Forbidden`: “Only .md and .pdf files are allowed!” | The server listed the file but blocked its download because of the extension. |
| Append `.md`: `suspicious_errors.yml.md` | The request failed; no file contents were returned. | There was no file with this name. Adding an allowed extension did not select the existing YAML file. |

I sent each path as a separate request in Burp Repeater. These are their request lines; headers are omitted:

```http
GET /ftp/suspicious_errors.yml HTTP/1.1
GET /ftp/suspicious_errors.yml.md HTTP/1.1
```

## Solution

While considering another four-star challenge, I noticed the *Poison Null Byte* hint on the scoreboard: “Bypass a security control with a Poison Null Byte to access a file not meant for your eyes.” The [PentesterLab explanation of null-byte injection](https://pentesterlab.com/glossary/null-byte-injection) showed a classic file-extension bypass. I used that idea to test whether Juice Shop would accept an added `.md` ending but still open the original YAML file:

```http
GET /ftp/suspicious_errors.yml%2500.md HTTP/1.1
```

### Why `%2500` works here

In a URL, `%00` represents a null byte and `%25` represents a literal percent sign. Encoding the percent sign in `%00` gives `%2500`. After one URL-decoding step, the filename contains the text `%00` before `.md`. This encoding can also be checked with [CyberChef](https://gchq.github.io/CyberChef/).

The PentesterLab example describes systems where a null byte ends a string. The local Juice Shop source clone works differently: its own helper searches for the literal text `%00` and cuts the filename there.

Inspection of the local Juice Shop source clone showed this order in `routes/fileServer.ts` and `lib/insecurity.ts`:

1. After URL decoding, the filename is `suspicious_errors.yml%00.md`.
2. The file handler checks whether the name ends in `.md` or `.pdf`. This name ends in `.md`, so it passes.
3. The helper `cutOffPoisonNullByte` searches for the literal text `%00` and removes it and everything after it.
4. The handler uses the remaining name, `suspicious_errors.yml`, to send the file.

The application therefore checks a name ending in `.md` but opens the YAML file after shortening that name. This explanation comes from the local source clone; the exact source revision running in my Kali lab was not independently verified.

## Result and Evidence

Repeater displayed the contents of `suspicious_errors.yml`. Juice Shop also displayed both success notifications in my lab:

- **Misplaced Signature File:** Access a misplaced SIEM signature file.
- **Poison Null Byte:** Bypass a security control with a Poison Null Byte to access a file not meant for your eyes.

The same request completed both challenges.

## Lessons Learned

The file check accepted a name ending in `.md`, but the application opened the YAML file after shortening that name. I learned that the server must finish decoding and normalizing a filename before checking it, then open that same checked file. Only approved files should be served from a public directory, while internal SIEM rules belong outside it. The exposed rule also showed details of the lab's monitoring configuration.

[Back to Juice Shop Master](../README.md)

---
sidebar_label: 'Challenge: Misplaced Signature File'
---

# Challenge: Misplaced Signature File

**Category:** Observability Failures · **Difficulty:** 4 stars

:::warning Authorized lab use only

This report uses my own Juice Shop training lab. Only repeat these steps in your own lab or with explicit permission. See the [project's safety guidance](../README.md#quickstart).

:::

## Task

The goal was to access a misplaced SIEM signature file in my own Juice Shop lab. A SIEM signature describes patterns used to detect suspicious events in logs. Exposing such a file can reveal what security monitoring looks for.

## Tests

I selected this challenge from the unsolved four-star challenges on the scoreboard. [SigmaHQ's rule repository](https://github.com/SigmaHQ/sigma) showed me that SIEM detection rules can use YAML. This reminded me of `suspicious_errors.yml`, which I had seen while browsing the `/ftp` directory over HTTP. The extension was a clue, not proof that this file was a Sigma rule.

I intercepted the file request with Burp Intercept and sent it to Repeater. I changed the request path to investigate why the visible file could not be downloaded.

| Test | Observed response | What I learned |
| --- | --- | --- |
| Request `suspicious_errors.yml` directly | `403 Forbidden`: “Only .md and .pdf files are allowed!” | The server listed the file but blocked its download because of the extension. |
| Append `.md`: `suspicious_errors.yml.md` | `404 Not Found`; no file contents were returned. | There was no file with this name. Adding an allowed extension did not select the existing YAML file. |

I sent each path as a separate request in Burp Repeater. These are their request lines; headers are omitted:

```http
GET /ftp/suspicious_errors.yml HTTP/1.1
GET /ftp/suspicious_errors.yml.md HTTP/1.1
```

## Solution

The *Poison Null Byte* challenge hint on the scoreboard suggested bypassing a file-access control. The [PentesterLab explanation of null-byte injection](https://pentesterlab.com/glossary/null-byte-injection) showed a classic file-extension bypass. I used that idea to test whether Juice Shop would accept an added `.md` ending but still open the original YAML file:

```http
GET /ftp/suspicious_errors.yml%2500.md HTTP/1.1
```

### Understanding the `%2500.md` payload

In a URL, `%00` represents a null byte and `%25` represents a literal percent sign. Encoding the percent sign in `%00` gives `%2500`. This encoding can also be checked with [CyberChef](https://gchq.github.io/CyberChef/).

The payload combines the original filename, the encoded null-byte sequence, and an allowed-looking extension:

| Part | Purpose in my test |
| --- | --- |
| `suspicious_errors.yml` | Identifies the YAML file I wanted to read. |
| `%2500` | Becomes the text `%00` after one URL-decoding step. I used it to test the null-byte bypass described above. |
| `.md` | Gives the request path an extension named as allowed in the earlier error message. |

Unlike adding `.md` alone, adding `%2500.md` returned the YAML contents. This showed that the encoded suffix bypassed the download restriction in my lab; the responses did not reveal the exact internal processing steps.

## Result and Evidence

Repeater displayed the contents of `suspicious_errors.yml`. The same request triggered success notifications for both *Misplaced Signature File* and *Poison Null Byte* in my lab.

## Lessons Learned

I learned that an extension restriction alone did not protect this file. A server should check the final resolved file against an explicit list of permitted downloads, rather than rely only on the ending of a request path. Internal SIEM rules belong outside public download directories because they can reveal what monitoring detects.

[Back to Juice Shop Master](../README.md)

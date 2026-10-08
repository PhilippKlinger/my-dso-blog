---
sidebar_label: 'Challenge: Unsigned JWT'
---

# Challenge: Unsigned JWT

**Category:** Vulnerable Components · **Difficulty:** 5 stars

## Task

The challenge asks me to impersonate jwtn3d@juice-sh.op, a user who does not exist in the database, by using an unsigned JWT. An unsigned token with `alg: none` has no signature proving who issued it. I wanted to see whether a token claiming this identity would complete the challenge in my own Juice Shop lab.

## Tests

From my previous work as a full-stack developer, I was familiar with token-based authentication and expected the login response to contain a JWT. I logged in with an existing account in my Kali lab, intercepted the login request with Burp Suite, and sent it to Repeater. The `200 OK` login response contained a token, which I copied into the [jwt.io decoder](https://www.jwt.io/).

| Test | Observed response | What I learned |
| --- | --- | --- |
| Inspect the login response in Repeater | `200 OK` with a JWT | The returned token's header named `RS256` as its signing algorithm. |
| Decode the token with jwt.io | Header contained `typ: JWT` and `alg: RS256`; payload contained the account email under `data.email` | The token carried identity details. Its contents were encoded, not encrypted. |

The decoded header showed the signing algorithm:

```json
{
  "typ": "JWT",
  "alg": "RS256"
}
```

The original token also contained account data that should not be published. I do not include the token, test password, or password hash in this report.

## Solution

The challenge description gave me the target identity. In the [jwt.io encoder](https://www.jwt.io/), I changed the header algorithm from `RS256` to `none` and changed `data.email` to `jwtn3d@juice-sh.op`. I copied the newly encoded, unsigned token and sent it as a Bearer token in a request to the product reviews endpoint:

```http
GET /rest/products/1/reviews HTTP/1.1
Authorization: Bearer [unsigned JWT omitted]
```

With `alg: none`, the final dot indicates an empty signature section. I kept the rest of the decoded payload and changed only the target email. In the local source clone I inspected, the challenge check looks for the `none` algorithm and an email containing `jwtn3d@`. I did not verify that the Kali instance ran the same source revision.

## Result and Evidence

The reviews request returned `200 OK` with product reviews. This shows that the public GET endpoint answered my request, but it does not prove that the endpoint authenticated the forged identity.

Juice Shop displayed the successful *Unsigned JWT* challenge notification in my Kali lab. That notification was my evidence that I completed this challenge.

## Lessons Learned

Decoding a JWT made its claims readable, but it did not make them trustworthy. Changing the header to `alg: none` and the email showed why a server must not trust identity claims from an unsigned token. The challenge success notification was evidence for this exercise; the public endpoint's response was not evidence of a login as the forged user.

A server must reject unsigned tokens when it expects signed ones, verify the signature and required claims before trusting a token, and determine identity and permissions on the server rather than trusting changed client-supplied claims.

[Back to Juice Shop Master](../README.md)

---
sidebar_label: 'Challenge: Unsigned JWT'
---

# Challenge: Unsigned JWT

**Category:** Vulnerable Components · **Difficulty:** 5 stars

**CWE:** [CWE-347: Improper Verification of Cryptographic Signature](https://cwe.mitre.org/data/definitions/347.html)

For the required tools, see the [project prerequisites](../README.md#prerequisites).

:::warning Authorized lab use only

This report uses my own Juice Shop training lab. Only repeat these steps in your own lab or with explicit permission. See the [project's safety guidance](../README.md#quickstart).

:::

## Task

The goal was to impersonate jwtn3d@juice-sh.op, a user who does not exist in the database, using an unsigned JWT in my own Juice Shop lab. An unsigned token with `alg: none` has no signature proving who issued it.

## Tests

My full-stack experience led me to look for a JWT in the login response. I logged in with an existing lab account, intercepted the request with Burp Suite, and sent it to Repeater. I then inspected the returned token with the [jwt.io decoder](https://www.jwt.io/).

:::warning Token safety

Only use disposable tokens from a training lab with fictional data in online tools. Do not paste production tokens, real credentials, or personal data into them.

:::

| Test | Observed response | What I learned |
| --- | --- | --- |
| Inspect the login response in Repeater | `200 OK` with a JWT | The login returned a token I could examine. |
| Decode the token with jwt.io | Header contained `typ: JWT` and `alg: RS256`; payload contained the account email under `data.email` | The token carried identity details. Its contents were encoded, not encrypted. |

The decoded header showed the signing algorithm:

```json
{
  "typ": "JWT",
  "alg": "RS256"
}
```

Tokens are omitted from this report to avoid publishing account data; test passwords and password hashes are also excluded.

## Solution

The challenge description gave me the target identity. A signed JWT has three dot-separated parts: `header.payload.signature`. In the [jwt.io encoder](https://www.jwt.io/), I prepared the unsigned token as follows:

| Part | Change | Purpose |
| --- | --- | --- |
| Header: `alg` | `RS256` → `none` | Declare an unsigned token. |
| Payload: `data.email` | Lab account email → `jwtn3d@juice-sh.op` | Claim the identity required by the challenge. |
| Signature | Leave empty | Send no signature; the token ends after the second dot. |

I kept the rest of the decoded payload unchanged. In Burp Repeater, I replaced the Bearer token in a product reviews request with the newly encoded token and sent it:

```http
GET /rest/products/1/reviews HTTP/1.1
Authorization: Bearer [unsigned JWT omitted]
```

## Result and Evidence

The request with the unsigned token returned `200 OK` with product reviews, and Juice Shop displayed the successful *Unsigned JWT* challenge notification. This confirmed that I completed the challenge in my lab. The public endpoint's response alone would not prove authentication as the forged user.

## Lessons Learned

Decoding a JWT made its claims readable, but it did not make them trustworthy. Being able to edit an identity claim is not proof of that identity.

A server must reject unsigned tokens when it expects signed ones and verify the signature and required claims before using them to establish identity or grant access.

[Back to Juice Shop Master](../README.md)

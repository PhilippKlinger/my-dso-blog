# Juice Shop Master

I use OWASP Juice Shop to investigate web vulnerabilities in my own Kali Linux training environment. This project covers three planned challenges: Database Schema, Access Log, and Unsigned JWT. Each report explains how I investigate the weakness, what the results show, and how it could be prevented. Database Schema is solved and documented; the other two challenges are planned.

## Table of Contents

- [Educational Purpose](#educational-purpose)
- [Quickstart](#quickstart)
- [Challenges](#challenges)

## Educational Purpose

These exercises are for educational and defensive learning in an intentionally vulnerable, authorized lab. I use no real personal data. Only test systems you own or have explicit permission to assess.

## Quickstart

This guide uses my existing Juice Shop lab, which starts automatically on my Kali Linux VM. It assumes access to that VM, a browser, and Burp Suite; it does not cover installing a new lab.

1. Start the Kali VM and open the running Juice Shop application in the browser.
2. Open the scoreboard to find the challenge and check its current status.
3. For Database Schema, use Burp's browser to capture a product-search request and send it to Repeater. Follow the [challenge report](./database-schema/README.md) to compare the requests and responses.
4. Check the challenge indicator after the exercise and record the result.

To run this documentation site locally instead, follow the [repository README](https://github.com/PhilippKlinger/my-dso-blog#local-verification).

## Challenges

The planned selection covers three different security areas. Demonstration videos will be linked here when available; each video will be no longer than five minutes.

| Challenge | Difficulty | Category | Risk and possible consequences | Report and video |
| --- | --- | --- | --- | --- |
| Database Schema | 3 stars | Injection | SQL injection can expose database structure and potentially other data. Detailed database errors can also help an attacker understand the application. | [Report](./database-schema/README.md). Solved; video pending. |
| Access Log | 4 stars | Observability Failures | Exposed server access logs can reveal requested paths and operational details that help an attacker investigate the application. | Planned; report and video pending. |
| Unsigned JWT | 5 stars | Vulnerable Components | Accepting a token without a valid signature can allow impersonation and access under a forged identity. | Planned; report and video pending. |

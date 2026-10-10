# Juice Shop Master

Juice Shop Master is a project in my DevSecOps training at Developer Akademie. I solved three challenges in my own Kali Linux lab: Database Schema, Misplaced Signature File, and Unsigned JWT. These reports document how I investigated each vulnerability, tested my ideas, and understood the results. I mainly used Burp Suite to intercept, modify, and resend HTTP requests.

:::warning Educational use and authorized testing

OWASP Juice Shop is an intentionally vulnerable training application. I worked only in my own controlled lab with fictional data to understand attack methods and their defenses. Only use these techniques in your own lab or on systems you have explicit permission to test.

:::

## Table of Contents

- [About OWASP Juice Shop](#about-owasp-juice-shop)
- [Quickstart](#quickstart)
- [Challenges](#challenges)

## About OWASP Juice Shop

[OWASP Juice Shop](https://owasp.org/projects/juice-shop) is an intentionally vulnerable web application for security training. It offers challenges across different vulnerability categories and tracks completed challenges on a scoreboard.

## Quickstart

This is the manual way to start Juice Shop in my Kali Linux training VM. Use only an instance you control or are authorized to test.

My lab used [OWASP Juice Shop v20.2.0](https://github.com/juice-shop/juice-shop/releases/tag/v20.2.0) for all three challenges.

:::warning Lab safety

Keep this intentionally vulnerable application in an isolated training environment. Do not expose it to the public internet or use real personal data or reused passwords. Opening `localhost` in a browser does not by itself restrict network access to the server.

:::

### Prerequisites

- [Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- The [pre-built Kali Linux VirtualBox image](https://www.kali.org/get-kali/) and Kali's [import guide](https://www.kali.org/docs/virtualization/import-premade-virtualbox/)
- A Node.js version supported by the Juice Shop release you choose; check the official [running guide](https://pwning.owasp-juice.shop/companion-guide/local/part1/running.html)
- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload) for intercepting HTTP requests with Proxy and modifying and resending them with Repeater
- A browser connected to Burp's proxy, such as the built-in Burp Browser or Firefox configured to use Burp

The reports also reference these browser-based helpers; no separate installation is needed:

- [CyberChef](https://gchq.github.io/CyberChef/) for URL encoding in Database Schema and optional encoding checks for Misplaced Signature File
- [jwt.io](https://www.jwt.io/) for decoding and preparing JWTs in Unsigned JWT; use only disposable lab tokens with fictional data, as explained in the [token safety guidance](./unsigned-jwt/README.md#tests)

### Start the lab

1. Install VirtualBox, download the Kali VirtualBox image, and import it using Kali's guide.
2. Start the Kali VM and install the supported Node.js version there.
3. Download a [pre-packaged Juice Shop release](https://github.com/juice-shop/juice-shop/releases) for Linux that matches your Node.js version and unpack it in Kali.
4. Open a terminal in the unpacked Juice Shop folder and start the application:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in the Kali VM's browser.

## Challenges

I selected three challenges from different security areas. The consequences below describe what similar weaknesses could allow in a real application; the reports distinguish those risks from what I actually observed in Juice Shop.

| Challenge | Difficulty | Category | Risk and possible consequences | Report |
| --- | --- | --- | --- | --- |
| Database Schema | 3 stars | Injection | SQL injection can expose database structure and potentially other data. Detailed database errors can also help an attacker understand the application. | [Read the report](./database-schema/README.md) |
| Misplaced Signature File | 4 stars | Observability Failures | An exposed SIEM rule reveals what monitoring is configured to detect and could help an attacker avoid those checks. | [Read the report](./misplaced-signature-file/README.md) |
| Unsigned JWT | 5 stars | Vulnerable Components | If a server trusts an unsigned token, a forged identity could be used for unauthorized actions. | [Read the report](./unsigned-jwt/README.md) |

# Juice Shop Master

I used OWASP Juice Shop to investigate web vulnerabilities in my own Kali Linux training lab. This project documents three challenges I solved during my DevSecOps training: Database Schema, Misplaced Signature File, and Unsigned JWT. Each report follows my investigation, the result I observed, and the security lesson behind it.

:::info
**Educational use and authorized testing:** OWASP Juice Shop is an intentionally vulnerable training application. I worked only in my own controlled lab with fictional data to understand attack methods and their defenses. These techniques should only be used on systems you own or are explicitly authorized to test.
:::

## Table of Contents

- [About OWASP Juice Shop](#about-owasp-juice-shop)
- [Quickstart](#quickstart)
- [Challenges](#challenges)

## About OWASP Juice Shop

[OWASP Juice Shop](https://owasp.org/projects/juice-shop) is a deliberately insecure web application for security training. It includes challenges across different vulnerability categories and tracks progress on a score board. The three reports below show how I investigated specific behavior in the application and connected the observed results to possible defenses.

## Quickstart

This is the manual way to start Juice Shop in my Kali Linux training VM. Use only an instance you control or are authorized to test.

### Prerequisites

- [Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- The [pre-built Kali Linux VirtualBox image](https://www.kali.org/get-kali/) and Kali's [import guide](https://www.kali.org/docs/virtualization/import-premade-virtualbox/)
- A Node.js version supported by the Juice Shop release you choose; check the official [running guide](https://pwning.owasp-juice.shop/companion-guide/local/part1/running.html)

### Start the lab

1. Install VirtualBox, download the Kali VirtualBox image, and import it using Kali's guide.
2. Start the Kali VM and install the supported Node.js version there.
3. Download a [pre-packaged Juice Shop release](https://github.com/juice-shop/juice-shop/releases) for Linux that matches your Node.js version and unpack it in Kali.
4. Open a terminal in the unpacked Juice Shop folder and start the application:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in the Kali VM's browser.

My own VM also starts Juice Shop automatically, but the manual command above is enough. For other installation methods and more detail, see the official [running guide](https://pwning.owasp-juice.shop/companion-guide/local/part1/running.html). To run this Docusaurus site locally, follow the [repository quickstart](https://github.com/PhilippKlinger/my-dso-blog#quickstart).

## Challenges

I selected three challenges from different security areas. The consequences below describe what similar weaknesses could allow in a real application; the reports distinguish those risks from what I actually observed in Juice Shop.

| Challenge | Difficulty | Category | Risk and possible consequences | Report |
| --- | --- | --- | --- | --- |
| Database Schema | 3 stars | Injection | SQL injection can expose database structure and potentially other data. Detailed database errors can also help an attacker understand the application. | [Read the report](./database-schema/README.md) |
| Misplaced Signature File | 4 stars | Observability Failures | An exposed SIEM rule reveals what monitoring is configured to detect and could help an attacker avoid those checks. | [Read the report](./misplaced-signature-file/README.md) |
| Unsigned JWT | 5 stars | Vulnerable Components | If a server trusts an unsigned token, a forged identity could be used for unauthorized actions. | [Read the report](./unsigned-jwt/README.md) |

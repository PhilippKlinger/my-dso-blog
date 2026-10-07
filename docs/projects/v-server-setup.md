---
title: V-Server Setup
description: Documenting SSH access, NGINX, and GitHub connectivity on a V-Server.
sidebar_position: 1.5
---

# V-Server Setup

## Task

Document a basic V-Server setup with SSH key access, NGINX, Git, and SSH access to GitHub from the server.

## Problem

The setup needed a repeatable path from initial server access to key-based administration, a web server with a separate test site, and repository access from the server. Changing SSH login settings also required a way to check that key access still worked.

## Approach

1. Generate a local SSH key, add its public key to the server account, and test key-based login before changing SSH settings.
2. Document disabling password and root login, reloading SSH, and testing login again in a new session.
3. Install NGINX, check its configuration, and add a separate site on port `8081` while leaving the default site in place.
4. Configure Git identity and a separate SSH key for GitHub access from the server; document the corresponding connection checks.

## Solution

The setup guide brings key-based server access, a separate NGINX test site, and GitHub connectivity into one repeatable workflow. It includes checks for SSH access before and after login restrictions are applied, NGINX configuration, and GitHub authentication. This makes the configuration steps and their validation easier to follow.

## Evidence

- [V-Server setup README](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md) — the documented configuration steps and checks.
- [Setup documentation changes](https://github.com/PhilippKlinger/v-server-setup/pull/1) — the changes to the server setup guide.

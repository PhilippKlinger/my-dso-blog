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

The project repository contains a step-by-step setup guide and validation commands for SSH, NGINX, the alternative site, Git, and GitHub SSH access. The documentation was merged through [pull request #1](https://github.com/PhilippKlinger/v-server-setup/pull/1) on 11 March 2026.

## Evidence

- [V-Server setup README](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md) — the documented configuration steps and checks.
- [Merged pull request #1](https://github.com/PhilippKlinger/v-server-setup/pull/1) — the review and merge record for the documentation.

The available sources document how to perform the checks, but do not record their individual results or establish the server's current runtime state. Academy acceptance is not evidenced by these sources.

---
title: V-Server Setup and Hardening
description: Setting up, hardening and operating the production VPS behind a single TLS reverse proxy.
sidebar_position: 1.5
---

# V-Server Setup and Hardening

I set up one VPS to host my containerised projects, monitoring and a local incident assistant. The [repository README](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md) holds the commands and checks for every step; this page explains the decisions and the result.

## Task

One server runs several projects behind a single reverse proxy with TLS, plus uptime monitoring with a public status page. One person operates it. The setup had to be safe on the public internet, reproducible from the README and changeable without locking me out.

## Problem

- A public host is scanned within minutes, so password logins, open ports and unpatched packages get tried.
- With a single admin, a broken SSH config can mean a locked-out server and nobody to recover it.
- Docker publishes container ports past the host firewall, so `ufw` alone does not protect them.
- CI needs a way onto the server and the stacks need credentials, without secrets in Git or more access than needed.
- A backup that was never restored is not a backup.

## Approach

1. **Access and SSH hardening:** key-only login with a named sudo account, no root, no passwords. Every change is tested in a second session with a rollback ready, and checked with the effective config (`sshd -T`), because a cloud-image drop-in silently overrode my first edit.
2. **Firewall and updates:** a provider firewall filters before traffic reaches the host, which covers the Docker bypass. Unattended security updates close known holes without a login; reboots stay manual.
3. **Docker and deploy user:** Docker from the official repository with a verified key and hardened daemon defaults (log rotation, `live-restore`, `no-new-privileges`). CI gets its own account with no sudo, no interactive shell (no TTY) and no forwarding, and one key per repository so a leaked key can be revoked on its own.
4. **Edge proxy and network separation:** [Caddy](https://github.com/PhilippKlinger/vps-edge) is the only container that publishes ports and never touches the Docker socket. Each stack gets its own networks; databases and the local LLM have no route to the internet.
5. **Delivery by digest:** the server never builds. A deploy repository pins every image by digest, runs a smoke test and rolls back automatically on failure.
6. **Monitoring:** Uptime Kuma checks from the outside and serves a public status page; the dashboard is reachable only through an SSH tunnel.
7. **Backup and restore:** nightly database dumps plus a restore test into a throwaway database, so a backup counts only after a restore worked.

## Solution

The server accepts only key-based SSH and serves only the reverse proxy to the internet. Security updates install themselves, and each stack is isolated in its own networks. Deploys run from CI through a restricted account with images pinned by digest, a smoke test and rollback. Monitoring is public, and backups are verified by a restore test. Known limits are written down: Kuma runs on the server it watches, and backups stay on the VPS.

## Evidence

- [V-Server setup README](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md) — the full setup with decisions and verification, for example [SSH hardening](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md#2-ssh-hardening), [firewall](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md#3-firewall), [edge proxy and network separation](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md#8-edge-proxy-and-network-separation), [delivery](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md#9-delivery) and [backup and restore](https://github.com/PhilippKlinger/v-server-setup/blob/main/README.md#11-backup-and-restore).
- [vps-edge](https://github.com/PhilippKlinger/vps-edge) — Caddy configuration, networks, and CI that tests the proxy.
- [vps-monitoring](https://github.com/PhilippKlinger/vps-monitoring) — Uptime Kuma stack and status page allowlist.
- [videoflix-deploy](https://github.com/PhilippKlinger/videoflix-deploy) — digest-pinned images, deploy workflow with smoke test and rollback, backup and restore test.
- [vps-incident-assistant](https://github.com/PhilippKlinger/vps-incident-assistant) — alert to GitHub issue, local LLM without internet access.
- [Public status page](https://status.philipp-klinger.com) — live monitoring of the services on this server.

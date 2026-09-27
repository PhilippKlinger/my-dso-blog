---
title: WordPress Multi-Container Setup
description: Running WordPress and MariaDB as separate Docker Compose services with persistent data.
sidebar_position: 1.8
---

# WordPress Multi-Container Setup

## Task

Run WordPress and MariaDB as separate Docker Compose services on a local machine or VPS, and document how to configure and operate the stack.

## Problem

WordPress needed a database that was ready before the application started. Database credentials had to stay outside Git, while posts, uploads, and configuration needed to survive normal container recreation.

## Approach

1. Use the official WordPress and MariaDB images in one Compose network, exposing the WordPress HTTP port but not the database port.
2. Require database credentials from a local `.env` file, with `.env.example` documenting the variables without supplying passwords.
3. Add a MariaDB healthcheck and make WordPress wait for the healthy database service. Store application files and database state in separate named volumes.
4. Document startup, configuration, and persistence checks in the project README.

## Solution

The `feature/server-setup` branch contains the two-service Compose stack and operating guide. The project records report local startup, administrator login, data persistence, and VPS access checks performed by the learner. The academy accepted the project on 28 July 2026. [Pull request #1](https://github.com/PhilippKlinger/wordpress-multicontainer-setup/pull/1) remains open; this feature implementation has not been merged into `main`.

## Evidence

- [Feature-branch README](https://github.com/PhilippKlinger/wordpress-multicontainer-setup/blob/feature/server-setup/README.md) — setup, operation, configuration, and validation guide.
- [Feature-branch Compose file](https://github.com/PhilippKlinger/wordpress-multicontainer-setup/blob/feature/server-setup/docker-compose.yml) — service, healthcheck, network, and volume definitions.
- [Open pull request #1](https://github.com/PhilippKlinger/wordpress-multicontainer-setup/pull/1) — the feature diff and current review entry point.

The runtime checks above are historical learner reports. The project handoff records a successful `docker compose config --quiet` check on 28 July 2026 but no runtime retest then. Today's local or VPS state and a separately recorded restart-after-failure result remain unknown.

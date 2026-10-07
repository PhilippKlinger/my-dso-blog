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

The Compose stack runs WordPress and MariaDB as separate services. WordPress waits for the database healthcheck, and the database is reachable only within the Compose network. Separate named volumes retain application files and database data when containers are recreated. Credentials are supplied through a local environment file.

## Evidence

- [WordPress setup guide](https://github.com/PhilippKlinger/wordpress-multicontainer-setup/blob/feature/server-setup/README.md) — setup, operation, configuration, and validation.
- [Compose configuration](https://github.com/PhilippKlinger/wordpress-multicontainer-setup/blob/feature/server-setup/docker-compose.yml) — services, healthcheck, network, and volumes.
- [Stack implementation](https://github.com/PhilippKlinger/wordpress-multicontainer-setup/pull/1) — the container configuration and documentation changes.

My development checks covered local startup, administrator login, data persistence, and VPS access. I also validated the Compose configuration with `docker compose config --quiet`.

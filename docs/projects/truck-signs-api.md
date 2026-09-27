---
title: Truck Signs API
description: Repairing a Django and PostgreSQL container stack with Docker Compose.
sidebar_position: 1.97
---

# Truck Signs API

## Task

Repair the container setup for an existing academy-provided Django API and run it with PostgreSQL through Docker Compose. The application itself was supplied; my work focused on its container configuration, startup, documentation, and verification.

## Problem

The provided Dockerfile, Compose file, and entrypoint had build, configuration, and startup errors. The backend needed a ready database, persistent data, and a repeatable initialization sequence without exposing PostgreSQL or storing real credentials in Git.

## Approach

1. Correct the Python image build and configure separate backend and PostgreSQL services. Publish only the backend on host port `8020`; keep PostgreSQL inside the Compose network and store database and uploaded media in named volumes.
2. Use a database healthcheck and an entrypoint that validates required settings, waits for PostgreSQL, runs migrations and `collectstatic`, creates the configured administrator only when needed, then starts Gunicorn once.
3. Update the English setup guide and existing CI workflows to explain the configuration contract, build, checks, and operation of the stack.

## Solution

The repaired stack and documentation were merged into `main` through [pull request #1](https://github.com/PhilippKlinger/truck-signs-api/pull/1) on 15 September 2026. The learner confirmed direct academy acceptance that day. The workflows build and test the project; they do not automatically deploy it to a VPS.

## Evidence

- [README at the final feature commit](https://github.com/PhilippKlinger/truck-signs-api/blob/14beb4fab19b5b4cbfc4fcbef9d5a37289206669/README.md) — setup, configuration, CI, and recorded verification.
- [Compose file](https://github.com/PhilippKlinger/truck-signs-api/blob/14beb4fab19b5b4cbfc4fcbef9d5a37289206669/docker-compose.yml) and [entrypoint](https://github.com/PhilippKlinger/truck-signs-api/blob/14beb4fab19b5b4cbfc4fcbef9d5a37289206669/entrypoint.sh) — service isolation, persistence, and startup sequence.
- [Merged pull request #1](https://github.com/PhilippKlinger/truck-signs-api/pull/1) — the changes to the supplied project and their review history.

Private project records describe a successful local image build, Compose validation, an HTTP `200` response on port `8020`, and retained database data after stack recreation on 8 September. The final project handoff records successful CI checks and 28 Django tests on the feature commit on 15 September. These are historical checks; remaining unrecorded checklist details and today's container or VPS state are unknown.

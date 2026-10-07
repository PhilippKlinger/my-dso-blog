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

The repaired Compose stack runs the supplied Django API with an internal PostgreSQL service. The entrypoint checks required settings, prepares the database and static files, and starts Gunicorn after initialization. Named volumes retain database data and uploaded media. CI builds and tests the project; deployment to a VPS remains a separate operation.

## Evidence

- [API setup guide](https://github.com/PhilippKlinger/truck-signs-api/blob/14beb4fab19b5b4cbfc4fcbef9d5a37289206669/README.md) — setup, configuration, CI, and verification.
- [Compose file](https://github.com/PhilippKlinger/truck-signs-api/blob/14beb4fab19b5b4cbfc4fcbef9d5a37289206669/docker-compose.yml) and [entrypoint](https://github.com/PhilippKlinger/truck-signs-api/blob/14beb4fab19b5b4cbfc4fcbef9d5a37289206669/entrypoint.sh) — service isolation, persistence, and startup sequence.
- [Container fixes](https://github.com/PhilippKlinger/truck-signs-api/pull/1) — the build, configuration, startup, and documentation changes.

My local checks covered the image build, Compose configuration, an HTTP `200` response on port `8020`, and retained database data after stack recreation. CI checks and 28 Django tests also passed for the documented implementation.

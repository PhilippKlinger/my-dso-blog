---
title: Conduit Container
description: Containerizing an Angular frontend, Django backend, and PostgreSQL database with Docker Compose.
sidebar_position: 1.9
---

# Conduit Container

## Task

Run the existing Conduit frontend and backend with PostgreSQL as one documented Docker Compose stack. The frontend and backend came from separate academy repositories.

## Problem

The three services needed compatible images, a shared network, browser-reachable application ports, and persistent database storage. Configuration had to remain usable across local and VPS hosts without committing credentials.

## Approach

1. Include the Angular frontend and Django backend as pinned Git submodules. Build separate multi-stage images: Nginx serves the compiled frontend, and Gunicorn runs the backend.
2. Connect the services through Compose. Publish the frontend and backend ports, keep PostgreSQL internal, and wait for its healthcheck before starting the backend.
3. Keep credentials in local `.env` files and PostgreSQL data in a named volume. After the first review, remove tracked log exports and make the backend configuration template explicit.
4. Document setup, operation, and validation in the container project README.

## Solution

The container scope was merged into `main` through [pull request #1](https://github.com/PhilippKlinger/conduit-container/pull/1) on 4 August 2026. The learner confirmed academy acceptance of this project. The later CI/CD deployment is a separate project scope and is not part of this report.

## Evidence

- [Container-scope README at the merge commit](https://github.com/PhilippKlinger/conduit-container/blob/0a55b1bc3107aac627135d3ab9d0ecc1f427ec88/README.md) — setup, operation, and validation guide.
- [Compose file at the merge commit](https://github.com/PhilippKlinger/conduit-container/blob/0a55b1bc3107aac627135d3ab9d0ecc1f427ec88/docker-compose.yaml) — the three services, network, healthcheck, and database volume.
- [Merged pull request #1](https://github.com/PhilippKlinger/conduit-container/pull/1) — the container implementation and review diff.

Private project records describe earlier VPS build, navigation, administrator, restart, and persistence checks. The handoff after review changes records a successful static Compose check on 3 August 2026, but no new build or runtime retest of that revised commit. Those checks are historical; the retest and today's server state remain unknown.

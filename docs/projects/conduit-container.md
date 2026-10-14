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
3. Keep credentials in local `.env` files and PostgreSQL data in a named volume. Remove tracked log exports and document the backend configuration template.
4. Document setup, operation, and validation in the container project README.

## Solution

Docker Compose brings the Angular frontend, Django backend, and PostgreSQL database together in one stack. Separate images package the application services, a database healthcheck controls backend startup, and a named volume retains PostgreSQL data. Pinned submodules identify the application source versions used for the build. Automated delivery is described in the separate [Conduit Deployment](./conduit-deployment.md) report.

## Evidence

- [Container setup guide](https://github.com/PhilippKlinger/conduit-container/blob/0a55b1bc3107aac627135d3ab9d0ecc1f427ec88/README.md) — setup, operation, and validation.
- [Compose configuration](https://github.com/PhilippKlinger/conduit-container/blob/0a55b1bc3107aac627135d3ab9d0ecc1f427ec88/docker-compose.yaml) — the three services, network, healthcheck, and database volume.
- [Container implementation](https://github.com/PhilippKlinger/conduit-container/pull/1) — the application images, service configuration, and documentation changes.

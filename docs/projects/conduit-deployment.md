---
title: Conduit Deployment
description: Building Conduit images in CI and deploying them to a staging VPS with GitHub Actions.
sidebar_position: 1.95
---

# Conduit Deployment

## Task

Automate delivery of the already containerized Conduit application to a staging VPS. The [Conduit Container](./conduit-container.md) project provided the application stack; this project added the CI/CD path.

## Problem

Building on the VPS made releases hard to trace back to a source revision. Image publishing, SSH access, runtime configuration, and startup checks needed a defined handoff between GitHub Actions and the server.

## Approach

1. Run repository checks and application builds in CI, then build the frontend and backend images on GitHub runners and publish them to GHCR with source-commit tags and digests.
2. Use pushes to `feature/conduit-deployment` to exercise a staging rollout. Pull requests and `main` run CI without triggering that deployment.
3. Validate the image references, use SSH with a verified host key, and transfer a production Compose manifest that contains image references instead of build contexts. Start it with `docker compose up -d --no-build` and check service readiness and running image identity.

## Solution

The pipeline builds application images in GitHub Actions, publishes them to GHCR, and deploys selected image versions to a staging VPS over SSH. The VPS pulls the images instead of building them locally. Commit tags and image digests connect the deployed containers to their source revision, while rollout checks verify service readiness and running image identity. Deployment is triggered by the staging branch; pushes to `main` run CI only.

## Evidence

- [Deployment guide](https://github.com/PhilippKlinger/conduit-container/blob/feature/conduit-deployment/README.md) — CI, staging, configuration, and recovery.
- [CI workflow](https://github.com/PhilippKlinger/conduit-container/blob/feature/conduit-deployment/.github/workflows/ci.yml) and [deployment workflow](https://github.com/PhilippKlinger/conduit-container/blob/feature/conduit-deployment/.github/workflows/deployment.yml) — image build, publication, and staging rollout logic.
- [Production Compose manifest](https://github.com/PhilippKlinger/conduit-container/blob/feature/conduit-deployment/docker-compose.prod.yaml) — runtime images without VPS build contexts.
- [Pipeline implementation](https://github.com/PhilippKlinger/conduit-container/pull/2) — the CI/CD changes added to the container project.

A development version completed a staging rollout with running services, a healthy database, an API response, and logs. These checks covered basic service startup rather than all application features. The custom workflow logic also adds maintenance work; standard GitHub Actions should be considered before extending it further.

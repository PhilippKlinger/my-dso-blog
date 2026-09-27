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

The `feature/conduit-deployment` branch contains the CI and staging deployment workflows, production Compose manifest, and operating guide. The learner confirmed academy acceptance on 24 August 2026. [Pull request #2](https://github.com/PhilippKlinger/conduit-container/pull/2) remains open; this deployment scope is not merged into `main`. The final review described the implementation as technically robust, while finding the workflow too complex for the learning goal. The resulting lesson was to compare standard GitHub Actions before adding custom workflow logic.

## Evidence

- [Feature-branch README](https://github.com/PhilippKlinger/conduit-container/blob/feature/conduit-deployment/README.md) — the documented CI, staging, configuration, and recovery path.
- [CI workflow](https://github.com/PhilippKlinger/conduit-container/blob/feature/conduit-deployment/.github/workflows/ci.yml) and [deployment workflow](https://github.com/PhilippKlinger/conduit-container/blob/feature/conduit-deployment/.github/workflows/deployment.yml) — image build, publication, and staging rollout logic.
- [Production Compose manifest](https://github.com/PhilippKlinger/conduit-container/blob/feature/conduit-deployment/docker-compose.prod.yaml) — runtime images without VPS build contexts.
- [Open pull request #2](https://github.com/PhilippKlinger/conduit-container/pull/2) — the deployment changes relative to the merged container project.

Private project notes record a successful Actions and staging rollout on an earlier commit, `9570502`, followed by VPS observations of running services, a healthy database, an API response, and logs. They do not establish a deployment test for the current feature head. Navigation, failure-triggered restart, application data persistence, and today's server state remain unknown.

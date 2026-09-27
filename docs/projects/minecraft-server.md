---
title: Minecraft Server
description: Building a Fabric-enabled Minecraft Java server with Docker Compose and persistent world data.
sidebar_position: 1.7
---

# Minecraft Server

## Task

Build a Docker image for a Minecraft Java Edition server with Fabric mods and run it through Docker Compose on a local machine or VPS.

## Problem

The server needed explicit EULA acceptance, checked runtime settings, and a writable place for its world and configuration. Container recreation also had to preserve that data and any installed mods.

## Approach

1. Build a Java image with the Minecraft and Fabric server artifacts and run the process as a dedicated non-root user.
2. Define the `mc-server` Compose service with a configurable published port and a named volume mounted at `/data`.
3. Use an entrypoint to check the EULA, required files, data-directory access, and the `MAX_PLAYERS` range before starting the server. It applies the selected world name and player limit to `server.properties` and copies bundled mods without replacing existing files.
4. Document startup, logs, configuration, mod compatibility, and persistence checks in the project README.

## Solution

The `feature/setup-server` branch contains the image, Compose service, entrypoint, baseline Fabric mods, and operating guide. Project records document a successful image build, server start, external status check, and named-volume persistence check on 24 July 2026. The academy accepted the project in the final review recorded on 27 July 2026. [Pull request #1](https://github.com/PhilippKlinger/minecraft-server/pull/1) remains open; the implementation has not been merged into `main`.

## Evidence

- [Feature-branch README](https://github.com/PhilippKlinger/minecraft-server/blob/feature/setup-server/README.md) — the configuration, operation, and validation guide for the implemented branch.
- [Open pull request #1](https://github.com/PhilippKlinger/minecraft-server/pull/1) — the complete feature diff and current review entry point.

The runtime checks above are historical. The available records do not establish today's server state. An optional Java client check and a separately archived restart-after-failure result remain unknown.

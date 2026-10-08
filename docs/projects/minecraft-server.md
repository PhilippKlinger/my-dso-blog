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

The custom image runs a Fabric-enabled Minecraft Java server through Docker Compose. The entrypoint validates the startup settings and prepares the data directory before launching Java. World data, configuration, and mods are stored in a named volume so they can survive container recreation. The operating guide explains configuration, mod management, and server checks.

## Evidence

- [Server setup guide](https://github.com/PhilippKlinger/minecraft-server/blob/feature/setup-server/README.md) — configuration, operation, and validation.
- [Server implementation](https://github.com/PhilippKlinger/minecraft-server/pull/1) — the image, Compose service, entrypoint, and bundled mods.

During development, I checked the image build, server startup, external status response, and named-volume persistence. The status response confirms server availability; it does not replace a full connection test with a Minecraft client.

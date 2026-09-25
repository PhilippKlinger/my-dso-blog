---
title: Minecraft Server
description: A Dockerized Minecraft Java Edition server with Fabric mod support.
sidebar_position: 3
---

# Minecraft Server

The [Minecraft Server repository](https://github.com/PhilippKlinger/minecraft-server) documents a Dockerized Minecraft Java Edition server with Fabric mod support. Its `Dockerfile` builds the runtime image, while `compose.yml` defines the `mc-server` service and a named volume for persistent server data. The entrypoint checks runtime prerequisites and the EULA before starting the server.

The repository README contains the configuration, startup, persistence, mod, security, and validation instructions. Those details should be checked there before operating or changing the service.

---
title: Baby Tools Shop
description: Containerizing a Django shop with persistent data and a repeatable startup process.
sidebar_position: 1.6
---

# Baby Tools Shop

## Task

Prepare an existing Django shop for local container use and deployment on a VPS. The project needed an image, a Compose setup, and instructions for configuring and checking the application.

## Problem

The container needed environment-specific Django settings, a reliable startup sequence, and storage that would retain the SQLite database and uploaded product images across normal restarts. Static files and the admin page also had to work in the container.

## Approach

1. Move Django runtime settings into environment variables and document them in `.env.example`.
2. Build a Python image that runs Gunicorn as a dedicated non-root user and collects static files during the build. Use WhiteNoise to serve those files.
3. Define a Compose service with a configurable host port and a named volume for the SQLite database and uploaded media.
4. Add an entrypoint that checks the database path, applies existing migrations, and then starts the application.

## Solution

The Django shop runs in a Docker container with Gunicorn and WhiteNoise. Runtime settings come from environment variables, while a named volume keeps the SQLite database and uploaded media outside the container's writable layer. The entrypoint applies migrations before starting the application, and the setup guide explains local use and VPS deployment.

## Evidence

- [Project README](https://github.com/PhilippKlinger/baby-tools-shop/blob/main/README.md) — setup, configuration, persistence, and validation instructions.
- [Container implementation](https://github.com/PhilippKlinger/baby-tools-shop/pull/1) — the Dockerfile, Compose configuration, and startup changes.

My local checks covered the image build, application startup, admin access, static files, uploaded media, and data persistence.

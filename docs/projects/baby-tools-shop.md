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

The repository contains the Dockerfile, Compose configuration, entrypoint, environment template, and a setup guide for local use and VPS deployment. The containerization work was merged in [pull request #1](https://github.com/PhilippKlinger/baby-tools-shop/pull/1) in April 2026.

## Evidence

- [Project README](https://github.com/PhilippKlinger/baby-tools-shop/blob/main/README.md) — setup, configuration, persistence, and validation instructions.
- [Merged pull request #1](https://github.com/PhilippKlinger/baby-tools-shop/pull/1) — the containerization changes and review history.

Contemporaneous private session notes record a successful local build and startup, admin access, static files, uploaded media, and persistence checks. They do not establish the current VPS runtime state. Academy acceptance is not evidenced by the available sources.

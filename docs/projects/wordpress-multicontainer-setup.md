---
title: WordPress Multi-Container Setup
description: WordPress and MariaDB configured as Docker Compose services.
sidebar_position: 4
---

# WordPress Multi-Container Setup

The [WordPress Multi-Container Setup repository](https://github.com/PhilippKlinger/wordpress-multicontainer-setup) documents WordPress and MariaDB as separate Docker Compose services. It uses the official application images and named volumes for application and database state. An `.env.example` describes the non-secret configuration contract; credentials belong in the local, ignored `.env` file.

The repository README provides the setup, persistence, security, and validation instructions. This page is a project index, not a substitute for those operational details.

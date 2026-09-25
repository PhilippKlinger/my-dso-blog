---
title: Conduit Container
description: An Angular, Django REST, and PostgreSQL application run with Docker Compose.
sidebar_position: 5
---

# Conduit Container

The [Conduit Container repository](https://github.com/PhilippKlinger/conduit-container) runs an Angular frontend served by Nginx, a Django REST backend, and a PostgreSQL database through Docker Compose. The frontend and backend are separate Git submodules pinned by the parent repository. PostgreSQL is available inside the Compose network rather than published as a browser-facing service.

The repository README explains local startup, configuration, deployment, security, and validation. Consult that source for current commands and requirements.

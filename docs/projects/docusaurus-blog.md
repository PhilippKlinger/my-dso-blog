---
title: Docusaurus Blog
description: How the Docusaurus starter was configured as a DevSecOps project portfolio.
sidebar_position: 2
---

# Docusaurus Blog

This project turns a Docusaurus starter into a place for my DevSecOps project documentation. The [repository README](https://github.com/PhilippKlinger/my-dso-blog) covers the file layout and local commands; this page records the task, changes, and current evidence.

## Task

The starter contained generic branding, example posts and tutorials, and links to its source repository. The goal was to configure it as my DevSecOps portfolio, document the setup, and prepare a GitHub Pages deployment without presenting sample content as my work.

## Implementation

1. I established an npm-based Docusaurus 3.10.2 baseline on `main`, then made the portfolio changes on `setup-blog`.
2. In `docusaurus.config.ts`, I set the site title, tagline, GitHub Pages URL and project path. `example.env` documents `GIT_REPOSITORY_URL`; the config reads that value or uses a default for the repository link and both docs and optional blog `editUrl` values.
3. I replaced the starter navigation and footer with project and repository links, retained the checklist-required template attribution, and disabled the blog until original posts exist.
4. I removed sample pages and assets, added a project overview and this setup page, and documented the local build and intended Actions deployment in the README.

## Result and verification

The local site now builds a homepage, project overview, and Docusaurus setup page without the starter's example posts or tutorials. `npm run typecheck` and `npm run build` pass on `setup-blog`; the build generates static files in `build/`.

The existing GitHub Actions workflow is configured to build pull requests and deploy after a push to `main`. The GitHub Pages setting, CI run, and public URL still require verification; the local build alone does not establish a successful deployment.

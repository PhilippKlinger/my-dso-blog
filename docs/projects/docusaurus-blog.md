---
title: Docusaurus Blog
description: How the Docusaurus starter was configured as a DevSecOps project portfolio.
sidebar_position: 1.4
---

# Docusaurus Blog

This project turns a Docusaurus starter into a place for my DevSecOps project documentation. The [repository README](https://github.com/PhilippKlinger/my-dso-blog) covers the file layout and local commands; this page explains the configuration and how the site is built and deployed.

## Task

The starter contained generic branding, example posts and tutorials, and links to its source repository. The goal was to configure it as my DevSecOps portfolio, document the setup, and prepare a GitHub Pages deployment without presenting sample content as my work.

## Implementation

1. I used an npm-based Docusaurus 3.10.2 starter as the basis for the portfolio.
2. In `docusaurus.config.ts`, I set the site title, tagline, GitHub Pages URL and project path. `example.env` documents `GIT_REPOSITORY_URL`; the config reads that value or uses a default for the repository link and both docs and optional blog `editUrl` values.
3. I replaced the starter navigation and footer with project and repository links, retained the checklist-required template attribution, and disabled the blog until original posts exist.
4. I removed sample pages and assets, added a project overview and this setup page, and documented the local build and GitHub Actions deployment in the README.

## Result

The site provides a homepage, a project overview, and documentation pages with shared navigation. Personal branding and repository links replace the starter content, while the required template attribution remains in the footer. Docusaurus generates static files in `build/` for hosting on GitHub Pages.

GitHub Actions builds pull requests and deploys the site after a push to `main`. This keeps the published site tied to the main branch; local changes and feature branches need to reach that branch before appearing on the public site.

## Evidence

- [Site configuration](https://github.com/PhilippKlinger/my-dso-blog/blob/main/docusaurus.config.ts) — branding, navigation, repository links, and GitHub Pages settings.
- [Build and deployment workflows](https://github.com/PhilippKlinger/my-dso-blog/tree/main/.github/workflows) — the automated checks and publishing process.
- [Published site](https://philippklinger.github.io/my-dso-blog/) — the GitHub Pages deployment.

The documentation builds successfully with `npm run typecheck` and `npm run build`. The initial GitHub Pages deployment was also verified; a local build alone does not publish subsequent changes.

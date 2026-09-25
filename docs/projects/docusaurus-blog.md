---
title: Docusaurus Blog
description: Configuration and verification of this DevSecOps documentation site.
sidebar_position: 2
---

# Docusaurus Blog

This repository provides a Docusaurus site for my DevSecOps project documentation. The homepage points to a project overview, and each report links to its source repository. Example posts and tutorial pages have been removed so they are not presented as my work.

## Configuration

- `docusaurus.config.ts` defines the site identity, navigation, project-site URL, and repository edit links.
- `example.env` documents public configuration values, including `GIT_REPOSITORY_URL`; local `.env` files stay out of Git.
- `sidebars.ts` generates navigation from `docs/projects/`.
- `BLOG_ENABLED` keeps the blog section disabled until original posts are available.

## Local verification

Install dependencies with `npm ci`, run `npm run typecheck`, and generate the static site with `npm run build`. Use `npm start` for live editing or `npm run serve` to preview the production output. The build directory is generated and is not committed.

## Deployment path

The repository's GitHub Actions workflow builds pull requests and publishes the static output on a push to `main`. GitHub Pages must use **GitHub Actions** as its source. A successful local build does not prove that the Pages setting, workflow run, or public URL is working; those require separate checks before submission.

[View the source repository](https://github.com/PhilippKlinger/my-dso-blog).

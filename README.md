# DevSecOps Learning Journal

This repository contains my Docusaurus site for documenting projects from my DevSecOps training. The project pages explain the tasks, my approach, the results I observed, and the lessons relevant to secure development and operations.

## Table of Contents

- [Projects](#projects)
- [Quickstart](#quickstart)
- [Local verification](#local-verification)
- [Repository contents](#repository-contents)
- [Deployment](#deployment)

## Projects

- [Docusaurus Blog](docs/projects/docusaurus-blog.md) explains how I configured and deployed this documentation site.
- [Juice Shop Master](docs/projects/Juice%20Shop%20Master/README.md) documents three challenges completed in my own OWASP Juice Shop training lab: Database Schema, Misplaced Signature File, and Unsigned JWT.

> [!IMPORTANT]
> The Juice Shop exercises document authorized testing of an intentionally vulnerable lab for educational and defensive purposes. They do not describe tests against third-party systems or real user data.

The [project overview](docs/projects/overview.mdx) provides the entry point to the documentation site.

## Quickstart

The documentation site requires Node.js 24 or newer and npm. From the repository root:

```bash
npm ci
npm start
```

`npm start` runs the Docusaurus development server with live reload. Instructions for running OWASP Juice Shop itself are in the [Juice Shop Master guide](docs/projects/Juice%20Shop%20Master/README.md#quickstart).

## Local verification

```bash
npm run typecheck
npm run build
npm run serve
```

`npm run build` generates the static site in `build/`, and `npm run serve` previews that output. The defaults in `docusaurus.config.ts` work locally. Copy `example.env` to an untracked `.env` only if you need to override public configuration values; do not commit secrets.

## Repository contents

| Files | Purpose |
| --- | --- |
| `package.json`, `package-lock.json` | npm scripts, dependencies, and reproducible dependency versions. |
| `docusaurus.config.ts`, `example.env` | Site identity, URLs, navigation, footer, optional blog, and example environment settings. |
| `sidebars.ts`, `docs/projects/_category_.yaml` | Generated documentation navigation and project-category metadata. |
| `docs/projects/overview.mdx`, `docs/projects/docusaurus-blog.md` | Project index and documentation of this Docusaurus site. |
| `docs/projects/Juice Shop Master/` | Project README, navigation metadata, and separate reports for Database Schema, Misplaced Signature File, and Unsigned JWT. |
| `src/pages/`, `src/css/custom.css` | Homepage, layout, and shared styling. |
| `src/components/GithubLinkAdmonition/`, `static/img/github.svg` | Retained GitHub-link component and icon; the current pages do not use them. |
| `static/.nojekyll` | Static GitHub Pages marker. |
| `babel.config.js`, `tsconfig.json` | Docusaurus build and TypeScript configuration. |
| `.github/workflows/` | Pull-request build and main-branch Pages deployment workflows. |
| `.gitignore`, `.dockerignore`, `Dockerfile`, `LICENSE` | Ignore rules, optional legacy container build, and existing license. The Dockerfile is not used for GitHub Pages. |

## Deployment

GitHub Actions builds pull requests and deploys the static site to GitHub Pages after a push to `main`, provided Pages is configured to use **GitHub Actions**. The published site is at `https://PhilippKlinger.github.io/my-dso-blog/`; changes from a feature branch appear there after they are merged into `main`.

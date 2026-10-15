# DevSecOps Portfolio and Learning Journal

## Description

This Docusaurus and React portfolio presents my DevSecOps training projects, skills and contact information. Project reports document my approach, results and evidence.

[Visit the site](https://philippklinger.github.io/my-dso-blog/)

## Table of Contents

- [Description](#description)
- [Projects](#projects)
- [Quickstart](#quickstart)
  - [How to Start](#how-to-start)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Customizing Content](#customizing-content)
  - [Code Documentation](#code-documentation)
  - [Validation](#validation)
  - [Deployment](#deployment)

## Projects

The [project overview](docs/projects/overview.mdx) links to all training reports.

## Quickstart

Requirements: Git, Node.js 24 or newer, and npm.

### How to Start

```bash
git clone https://github.com/PhilippKlinger/my-dso-blog.git
cd my-dso-blog
npm ci
npm run docs:install
npm start
```

Open the local URL printed in the terminal.

## Usage

### Configuration

The defaults in `docusaurus.config.ts` work locally. For another deployment, copy `example.env` to `.env` and adjust:

| Variables | Purpose |
| --- | --- |
| `DEPLOYMENT_URL`, `BASE_URL` | Public domain and site path. |
| `GITHUB_ORG`, `GITHUB_PROJECT`, `DEPLOYMENT_BRANCH` | GitHub Pages repository and deployment branch. |
| `GIT_REPOSITORY_URL` | Repository and edit links. |

Keep `.env` untracked. Settings are read at build time; restart the development server after changes.

### Customizing Content

| Path | Purpose |
| --- | --- |
| `src/pages/index.tsx`, `src/components/` | Homepage layout and section content. |
| `src/data/skills.ts`, `src/data/projects.ts` | Skill cards and project highlights. |
| `docs/projects/`, `sidebars.ts` | Project reports and documentation navigation. |
| `src/theme/Navbar/` | Homepage and documentation navigation adapter. |
| Component CSS Modules, `src/css/portfolio.module.css` | Component styles and shared portfolio values. |
| `static/img/`, `src/assets/fonts/` | Images, icons and local font. |
| `tools/code-docs/package.json` and its `package-lock.json` | Documentation tool dependencies. |
| `tools/code-docs/typedoc.json`, `tools/code-docs/component-names.mjs` | Documented files and component names in the reference. |

### Code Documentation

TypeDoc generates the [code reference](https://philippklinger.github.io/my-dso-blog/code-reference/index.html) from the TSDoc comments. `npm start` and `npm run build` generate it automatically; use `npm run docs:build` to refresh it during development. See the [documentation guide](docs/code-reference.mdx) for details.

### Validation

```bash
npm run typecheck
npm run build
npm run serve
```

The build writes the production site to `build/`.

> [!NOTE]
> Use `npm start` to browse the code reference locally. The production preview
> (`npm run serve`) redirects its HTML links incorrectly under the repository path.

### Deployment

The workflows under `.github/workflows/` typecheck and build pull requests targeting `main`. Pushes to `main` deploy the built site to GitHub Pages; set the Pages source to **GitHub Actions**.

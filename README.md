# DevSecOps Portfolio

This Docusaurus and React portfolio presents my DevSecOps projects, skills and contact information. Project reports document my approach, results and evidence.

[![CI/CD](https://github.com/PhilippKlinger/my-dso-blog/actions/workflows/main.yml/badge.svg)](https://github.com/PhilippKlinger/my-dso-blog/actions/workflows/main.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Site](https://img.shields.io/badge/site-philippklinger.github.io-informational)](https://philippklinger.github.io/my-dso-blog/)

## Projects

The [project overview](docs/projects/overview.mdx) links to all project reports.

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

The workflows under `.github/workflows/` typecheck and build pull requests targeting `main`; the build is a required check before a merge. Pushes to `main` deploy the built site to GitHub Pages; set the Pages source to **GitHub Actions**.

## Related repositories

| Repository | Role |
|---|---|
| [v-server-setup](https://github.com/PhilippKlinger/v-server-setup) | Commands and checks behind the report "V-Server Setup and Hardening" |
| [vps-edge](https://github.com/PhilippKlinger/vps-edge), [vps-monitoring](https://github.com/PhilippKlinger/vps-monitoring), [vps-incident-assistant](https://github.com/PhilippKlinger/vps-incident-assistant) | The VPS platform the report describes |
| [videoflix-deploy](https://github.com/PhilippKlinger/videoflix-deploy) | Production stack running on that platform |

## License

[MIT](LICENSE)

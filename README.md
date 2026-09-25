# Philipp Klinger — DevSecOps Portfolio

This repository contains my DevSecOps project documentation as a static Docusaurus site. The [project overview](docs/projects/overview.mdx) links to the documentation of this site. The example blog posts were removed, and the blog feature is disabled until original posts are available.

## Local verification

Requires Node.js 24 or newer and npm. From the repository root:

```bash
npm ci
npm run typecheck
npm run build
```

`npm start` serves the site with live reload; `npm run serve` previews the generated `build/` output. The defaults in `docusaurus.config.ts` work locally. Copy `example.env` to an untracked `.env` only when overriding public configuration values; never commit secrets.

## Repository contents

| Files | Purpose |
| --- | --- |
| `package.json`, `package-lock.json` | npm scripts, dependencies, and reproducible dependency versions. |
| `docusaurus.config.ts`, `example.env` | Site identity, URLs, navigation, footer, optional blog, and example environment settings. |
| `sidebars.ts`, `docs/projects/_category_.yaml` | Generated docs navigation and project-category metadata. |
| `docs/projects/overview.mdx`, `docs/projects/docusaurus-blog.md` | Project index and documentation of this site. |
| `src/pages/index.tsx`, `src/pages/index.module.css` | Homepage and its layout. |
| `src/css/custom.css` | Shared site styling. |
| `src/components/GithubLinkAdmonition/index.tsx`, `static/img/github.svg` | Retained GitHub-link component and icon; the current pages do not use them. |
| `static/.nojekyll` | Static GitHub Pages marker. |
| `babel.config.js`, `tsconfig.json` | Docusaurus build and TypeScript configuration. |
| `.github/workflows/main.yml`, `.github/workflows/deploy.yaml` | Pull-request build and main-branch Pages deployment workflows. |
| `.github/workflows/create-pr.yaml`, `.github/workflows/check-open-pr.yaml`, `.github/dependabot.yml` | Pull-request automation/check and dependency-update configuration. |
| `.gitignore`, `.dockerignore`, `Dockerfile`, `LICENSE` | Ignore rules, optional legacy container build, and existing license. The Dockerfile is not used for GitHub Pages. |

## Deployment

GitHub Actions builds pull requests and deploys the static site to GitHub Pages after a push to `main`, provided Pages is configured to use **GitHub Actions**. The intended URL is `https://PhilippKlinger.github.io/my-dso-blog/`; the Pages setting, workflow run, and live site still need to be verified before submission.

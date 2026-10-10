# DevSecOps Learning Journal

I use this Docusaurus site to document my DevSecOps training projects. Each report explains the task, my approach, the results, and what I learned.

[Visit the learning journal](https://philippklinger.github.io/my-dso-blog/)

## Table of Contents

- [Projects](#projects)
- [Quickstart](#quickstart)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Validation](#validation)
  - [Deployment](#deployment)

## Projects

- [Docusaurus Blog](docs/projects/docusaurus-blog.md) explains how I configured and deployed this documentation site.
- [Juice Shop Master](docs/projects/Juice%20Shop%20Master/README.md) documents three solved security challenges and their defensive lessons from my OWASP Juice Shop lab.

> [!IMPORTANT]
> The Juice Shop exercises are for educational and defensive purposes and cover authorized testing in my own intentionally vulnerable lab.

## Quickstart

Requirements: Git, Node.js 24 or newer, and npm.

Clone the repository, install dependencies, and start the documentation site:

```bash
git clone https://github.com/PhilippKlinger/my-dso-blog.git
cd my-dso-blog
npm ci
npm start
```

Open the local URL printed in the terminal. The development server reloads the site when you edit its content.

## Usage

### Configuration

The defaults in `docusaurus.config.ts` work locally. To override the public site URLs and repository settings, copy `example.env` to `.env` and adjust the values. Keep `.env` untracked and never commit secrets.

Restart the development server after changing these settings. For published pages, the values must be available when the site is built.

### Validation

Check TypeScript, build the static site, and preview the production output:

```bash
npm run typecheck
npm run build
npm run serve
```

The build writes the static site to `build/`. Open the preview URL printed in the terminal to check the generated pages and navigation.

### Deployment

GitHub Actions builds pull requests targeting `main` and deploys the site to GitHub Pages after a push to `main`, with Pages configured to use **GitHub Actions**. Feature-branch changes reach the published site after they are merged into `main`.

<details>
<summary>Repository reference</summary>

| Files | Purpose |
| --- | --- |
| `package.json`, `package-lock.json` | npm commands and dependency versions. |
| `docusaurus.config.ts`, `example.env` | Site configuration and optional environment overrides. |
| `sidebars.ts`, `docs/projects/_category_.yaml` | Documentation navigation. |
| `docs/projects/overview.mdx`, `docs/projects/docusaurus-blog.md`, `docs/projects/Juice Shop Master/` | Project overview and reports. |
| `src/pages/`, `src/css/custom.css` | Homepage and shared styling. |
| `src/components/GithubLinkAdmonition/`, `static/img/github.svg` | Unused template component and icon. |
| `static/.nojekyll` | Static GitHub Pages marker. |
| `babel.config.js`, `tsconfig.json` | Docusaurus build and TypeScript configuration. |
| `.github/workflows/` | Build and deployment automation. |
| `.gitignore`, `.dockerignore` | Git and Docker exclusions. |
| `Dockerfile` | Legacy container build, unused by GitHub Pages. |
| `LICENSE` | Repository license. |

</details>

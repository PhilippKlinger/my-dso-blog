# DevSecOps Portfolio and Learning Journal

## Description

This Docusaurus site presents my DevSecOps training projects. The portfolio homepage introduces my skills, highlights selected projects, and provides contact links. The documentation contains project reports describing the task, my approach, the result, and supporting evidence.

[Visit the site](https://philippklinger.github.io/my-dso-blog/)

## Table of Contents

- [Description](#description)
- [Projects](#projects)
- [Quickstart](#quickstart)
  - [How to Start](#how-to-start)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Customizing Content](#customizing-content)
  - [Validation](#validation)
  - [Deployment](#deployment)

## Projects

- [Docusaurus Blog](docs/projects/docusaurus-blog.md) explains how I configured and deployed this documentation site.
- [V-Server Setup](docs/projects/v-server-setup.md) documents server access, NGINX, and GitHub connectivity.
- [Baby Tools Shop](docs/projects/baby-tools-shop.md) covers containerizing a Django shop with persistent SQLite and uploaded media.
- [Minecraft Server](docs/projects/minecraft-server.md) describes a Fabric-enabled Java server image with persistent world data.
- [WordPress Multi-Container Setup](docs/projects/wordpress-multicontainer-setup.md) covers WordPress and MariaDB services, health-aware startup, and persistent data.
- [Conduit Container](docs/projects/conduit-container.md) documents a Compose stack with an Angular frontend, Django backend, and PostgreSQL.
- [Conduit Deployment](docs/projects/conduit-deployment.md) describes CI image builds and deployment of the existing stack to a staging VPS.
- [Truck Signs API](docs/projects/truck-signs-api.md) covers repairing the supplied Django API's Compose stack with internal PostgreSQL and persistent data.
- [Juice Shop Master](docs/projects/Juice%20Shop%20Master/README.md) documents three solved security challenges and their defensive lessons from my OWASP Juice Shop lab.

> [!IMPORTANT]
> The Juice Shop exercises are for educational and defensive purposes and cover authorized testing in my own intentionally vulnerable lab.

## Quickstart

Requirements: Git, Node.js 24 or newer, and npm.

### How to Start

Clone the repository, install dependencies, and start the site:

```bash
git clone https://github.com/PhilippKlinger/my-dso-blog.git
cd my-dso-blog
npm ci
npm start
```

Open the local URL printed in the terminal. The development server reloads the site as you edit it.

## Usage

### Configuration

The defaults in `docusaurus.config.ts` work locally. To use another public URL or repository, copy `example.env` to `.env` and adjust its values:

- `DEPLOYMENT_URL` and `BASE_URL` set the site's domain and path.
- `GITHUB_ORG`, `GITHUB_PROJECT`, and `DEPLOYMENT_BRANCH` identify the GitHub Pages repository and branch.
- `GIT_REPOSITORY_URL` sets the repository links displayed on the site.

Keep `.env` untracked. These values are used during the build, so restart the development server after changing them.

### Customizing Content

The homepage in `src/pages/index.tsx` assembles the portfolio sections from `src/components/`. Edit `src/data/skills.ts` and `src/data/projects.ts` to change their cards. Project reports live under `docs/projects/`, with their navigation configured in `sidebars.ts`. `src/theme/Navbar/` selects the portfolio navigation on the homepage and the standard navigation elsewhere.

Component CSS Modules and `src/css/portfolio.module.css` control the portfolio design. Images and icons live under `static/img/`; the local font is in `src/assets/fonts/`.

### Validation

Check TypeScript, build the static site, and preview the production output:

```bash
npm run typecheck
npm run build
npm run serve
```

The build writes the static site to `build/`. Open the preview URL printed in the terminal to check the generated pages and navigation.

### Deployment

The workflows under `.github/workflows/` build pull requests targeting `main` and deploy the site to GitHub Pages after a push to `main`, with Pages configured to use **GitHub Actions**. Feature-branch changes reach the published site after they are merged into `main`.

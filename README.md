# Philipp Klinger — DevSecOps Portfolio

This repository contains my DevSecOps project documentation, built as a static site with [Docusaurus](https://docusaurus.io/). The [projects overview](docs/projects/overview.mdx) links to concise reports and the corresponding source repositories. Project-specific implementation and verification details remain in those repositories.

## Run locally

Use Node.js 24 or newer and npm. Copy `example.env` to a local `.env` if you need to override the site URL or other settings; `.env` is ignored by Git.

```bash
npm ci
npm start
```

The development server prints its local URL and reloads when content changes. To check the production output:

```bash
npm run typecheck
npm run build
npm run serve
```

The static output is written to `build/`, which is not committed.

## Repository files

- `docusaurus.config.ts` defines the site URL, navigation, footer, docs, and optional blog.
- `example.env` documents the non-secret deployment and repository URL settings. A local `.env` can override the defaults.
- `docs/projects/` contains the project overview and reports; `sidebars.ts` generates their navigation.
- `src/pages/index.tsx` and `src/components/HomepageFeatures/` render the homepage; their CSS modules control its layout.
- `static/` holds assets used by the site.
- `.github/workflows/main.yml` calls the build/deployment workflow for pull requests and pushes to `main`.
- `Dockerfile` is an optional container-hosting path and is not used by the GitHub Pages workflow.

The example blog posts have been removed. The blog is disabled by default and should only be enabled after original posts are ready.

## Deployment

GitHub Actions builds the site on pull requests without deploying it. A push to `main` triggers the workflow that publishes the generated static files to GitHub Pages, provided the repository's Pages source is set to **GitHub Actions**. The intended project-site URL is `https://PhilippKlinger.github.io/my-dso-blog/`.

The Pages setting, deployed URL, and pull-request checks must be verified in GitHub before submission; a successful local build does not establish that the site is live.

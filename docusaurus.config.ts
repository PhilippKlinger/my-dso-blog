import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {config as dotenvconfig}  from "dotenv";

dotenvconfig();

const blogEnabled = process.env.BLOG_ENABLED === 'true';
const gitRepositoryUrl =
  process.env.GIT_REPOSITORY_URL ??
  'https://github.com/PhilippKlinger/my-dso-blog';

const config: Config = {
  title: 'Philipp Klinger | DevSecOps Portfolio',
  tagline: 'Full-Stack Developer & DevSecOps Enthusiast — projects, practices, and lessons learned',

  url: process.env.DEPLOYMENT_URL ?? 'https://PhilippKlinger.github.io',
  baseUrl: process.env.BASE_URL ?? '/my-dso-blog/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: process.env.GITHUB_ORG ?? 'PhilippKlinger',
  projectName: process.env.GITHUB_PROJECT ?? 'my-dso-blog',

  deploymentBranch: process.env.DEPLOYMENT_BRANCH,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `${gitRepositoryUrl}/edit/main/`,
        },
        blog: blogEnabled ? 
          {
            showReadingTime: true,
            feedOptions: {
              type: ['rss', 'atom'],
              xslt: true,
            },
            editUrl: `${gitRepositoryUrl}/edit/main/`,
            // Useful options to enforce blogging best practices
            onInlineTags: 'warn',
            onInlineAuthors: 'warn',
            onUntruncatedBlogPosts: 'warn',
          }
          : false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Philipp Klinger',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'projectSidebar',
          position: 'left',
          label: 'Projects',
        },
        {
          href: gitRepositoryUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Projects',
              to: '/docs/projects',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Repository',
              href: gitRepositoryUrl,
            },
            {
              label: 'Template',
              href: 'https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Philipp Klinger. extended from the developer-akademie-starter`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'hcl'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};


if (blogEnabled) {
  (config.themeConfig!.navbar as any).items.push({to: '/blog', label: 'Blog', position: 'left'});
  (
    config.themeConfig!.footer as any
  ).links[1].items.push({
    to: '/blog',
    label: 'Blog',
  });
}

export default config;

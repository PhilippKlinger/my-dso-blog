import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {config as dotenvconfig} from 'dotenv';

dotenvconfig();

const blogEnabled = process.env.BLOG_ENABLED === 'true';
const gitRepositoryUrl =
  process.env.GIT_REPOSITORY_URL ??
  'https://github.com/PhilippKlinger/my-dso-blog';

const config: Config = {
  title: 'DevSecOps Learning Journal',
  tagline: 'Project reports from my DevSecOps training: tasks, implementation, results, and lessons learned.',
  favicon: 'img/devsecops.png',

  url: process.env.DEPLOYMENT_URL ?? 'https://PhilippKlinger.github.io',
  baseUrl: process.env.BASE_URL ?? '/my-dso-blog/',

  // Keep the existing GitHub Pages repository and deployment configuration.
  organizationName: process.env.GITHUB_ORG ?? 'PhilippKlinger',
  projectName: process.env.GITHUB_PROJECT ?? 'my-dso-blog',
  deploymentBranch: process.env.DEPLOYMENT_BRANCH,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
        blog: blogEnabled
          ? {
              showReadingTime: true,
              feedOptions: {
                type: ['rss', 'atom'],
                xslt: true,
              },
              editUrl: `${gitRepositoryUrl}/edit/main/`,
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
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Learning Journal',
      items: [
        {
          to: '/docs/projects/',
          label: 'Projects',
          position: 'left',
          activeBaseRegex: '/docs/projects(?:/|$)',
        },
        {
          href: 'https://philipp-klinger.com',
          label: 'Portfolio',
          position: 'right',
        },
        {
          href: gitRepositoryUrl,
          label: 'GitHub',
          position: 'right',
        },
        {
          to: '/imprint/',
          label: 'Impressum',
          position: 'right',
        },
        ...(blogEnabled
          ? [{to: '/blog', label: 'Blog', position: 'left' as const}]
          : []),
      ],
    },
    footer: {
      style: 'light',
      links: [
        {label: 'Projects', to: '/docs/projects/'},
        {label: 'Portfolio', href: 'https://philipp-klinger.com'},
        {label: 'GitHub', href: gitRepositoryUrl},
        {label: 'Impressum', to: '/imprint/'},
        ...(blogEnabled ? [{to: '/blog', label: 'Blog'}] : []),
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Philipp Klinger`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'hcl'],
      magicComments: [
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

export default config;

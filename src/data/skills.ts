/** A portfolio skill with concrete examples of its use. */
export interface Skill {
  /** Unique, stable ID used by project badges and accessible card labels. */
  id: string;
  name: string;
  /** Site-relative icon path without the deployment base URL. */
  icon: string;
  /** Short examples shown on the card; describe actual project experience. */
  details: readonly string[];
}

/**
 * Shared skill content in card and project-badge display order.
 *
 * @remarks
 * The skills section splits this list into mobile groups of up to three.
 * Project skill IDs must match entries here to produce a badge.
 */
export const skills: readonly Skill[] = [
  {
    id: 'html', name: 'HTML', icon: '/img/portfolio/skills/html.svg',
    details: ['Page layouts for web applications', 'Forms with accessible labels', 'Templates built with Angular and React'],
  },
  {
    id: 'css', name: 'CSS', icon: '/img/portfolio/skills/css.svg',
    details: ['Responsive layouts with Grid and Flex', 'Reusable styles for consistent layouts', 'Interactive hover and focus states'],
  },
  {
    id: 'static-site', name: 'Static site generation', icon: '/img/portfolio/skills/static-site.svg',
    details: ['Project documentation with Docusaurus', 'Pages written in Markdown and MDX', 'Static websites hosted on GitHub Pages'],
  },
  {
    id: 'python', name: 'Python', icon: '/img/portfolio/skills/python.svg',
    details: ['Django backends for web applications', 'REST APIs with user authentication', 'Backend services running in Docker'],
  },
  {
    id: 'shell', name: 'Shell scripting', icon: '/img/portfolio/skills/shell.svg',
    details: ['Startup scripts for application services', 'Database checks before application startup', 'Services starting with validated settings'],
  },
  {
    id: 'yaml', name: 'YAML', icon: '/img/portfolio/skills/yaml.svg',
    details: ['Connected services defined in Compose', 'Build and test workflows in GitHub Actions', 'Checked settings for container setups'],
  },
  {
    id: 'containers', name: 'Containers', icon: '/img/portfolio/skills/containers.svg',
    details: ['Applications running in Docker containers', 'Connected services with persistent storage', 'Healthchecks for reliable service startup'],
  },
  {
    id: 'ci-cd', name: 'CI/CD with GitHub Actions', icon: '/img/portfolio/skills/ci-cd.svg',
    details: ['Applications built and tested in workflows', 'Container images published to a registry', 'Build and deployment as separate steps'],
  },
  {
    id: 'security', name: 'IT security', icon: '/img/portfolio/skills/security.png',
    details: ['SSH connections with verified host keys', 'Credentials kept outside source control', 'Vulnerabilities analyzed in an OWASP lab'],
  },
];

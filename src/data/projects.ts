/** Content and link targets for one portfolio highlight. */
export interface Project {
  /** Unique, stable ID used for selection and accessible heading IDs. */
  id: string;
  title: string;
  description: string;
  /** Site-relative image path without the deployment base URL. */
  image: string;
  /** Description of the project image for readers who cannot see it. */
  imageAlt: string;
  /** IDs from the shared skills list; badges follow that list's order. */
  skillIds: readonly string[];
  /** Internal Docusaurus route, including a leading slash but no base URL. */
  documentation: string;
  /** Absolute URL of the repository or the project's own report directory. */
  github: string;
}

/**
 * Highlights in display order; keep at least one project in the list.
 *
 * @remarks
 * Desktop offers all entries for selection. Mobile shows the first three.
 * Full project reports remain available through the documentation overview.
 */
export const projects: readonly Project[] = [
  {
    id: 'conduit-deployment',
    title: 'Conduit Deployment',
    description: 'I added automated delivery to an existing Angular and Django application. The pipeline builds versioned container images in GitHub Actions and deploys selected releases to a staging server with verified SSH access and service checks.',
    image: '/img/portfolio/projects/conduit-deployment.svg',
    imageAlt: 'Conduit deployment illustration with a rocket over the application',
    skillIds: ['yaml', 'containers', 'ci-cd', 'security'],
    documentation: '/docs/projects/conduit-deployment',
    github: 'https://github.com/PhilippKlinger/conduit-container',
  },
  {
    id: 'truck-signs',
    title: 'Truck Signs API',
    description: 'Container setup for a supplied Django API with PostgreSQL. I repaired the image build and startup process, connected the services with Docker Compose, and added healthchecks and persistent storage while keeping the database internal.',
    image: '/img/portfolio/projects/truck-signs.svg',
    imageAlt: 'Reference view of the Truck Signs application',
    skillIds: ['python', 'shell', 'yaml', 'containers'],
    documentation: '/docs/projects/truck-signs-api',
    github: 'https://github.com/PhilippKlinger/truck-signs-api',
  },
  {
    id: 'juice-shop',
    title: 'Juice Shop Master',
    description: 'I investigated three security challenges in my own OWASP Juice Shop lab. Using Burp Suite, I explored SQL injection, exposed monitoring rules and unsigned JWTs, and documented what I found and the security implications.',
    image: '/img/portfolio/projects/juice-shop.png',
    imageAlt: 'Design reference screenshot of the OWASP Juice Shop product overview',
    skillIds: ['security'],
    documentation: '/docs/projects/Juice Shop Master/',
    github: 'https://github.com/PhilippKlinger/my-dso-blog/tree/main/docs/projects/Juice%20Shop%20Master',
  },
  {
    id: 'minecraft',
    title: 'Minecraft Server',
    description: 'I packaged a Minecraft Java server with Fabric mods for local or VPS use. The Docker and Compose setup validates startup settings, runs the server as a non-root user and keeps worlds, configuration and mods in persistent storage.',
    image: '/img/portfolio/projects/minecraft.svg',
    imageAlt: 'Minecraft illustration with the game title and a creeper',
    skillIds: ['shell', 'yaml', 'containers', 'security'],
    documentation: '/docs/projects/minecraft-server',
    github: 'https://github.com/PhilippKlinger/minecraft-server',
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    description: 'I set up WordPress and MariaDB as separate Docker Compose services. The setup checks database health and keeps posts, uploads and database data in persistent volumes. Credentials come from environment variables.',
    image: '/img/portfolio/projects/wordpress.svg',
    imageAlt: 'WordPress illustration with its logo and a website on a laptop',
    skillIds: ['yaml', 'containers'],
    documentation: '/docs/projects/wordpress-multicontainer-setup',
    github: 'https://github.com/PhilippKlinger/wordpress-multicontainer-setup',
  },
];

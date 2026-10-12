export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  skillIds: readonly string[];
  documentation: string;
  github: string;
}

export const projects: readonly Project[] = [
  {
    id: 'conduit-deployment',
    title: 'Conduit Deployment',
    description: 'Automated delivery for an existing Angular and Django application. The pipeline builds versioned container images in GitHub Actions and deploys selected releases to a staging server with verified SSH access and service checks.',
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
    description: 'Three security challenges investigated in my own OWASP Juice Shop lab. Using Burp Suite, I explored SQL injection, exposed monitoring rules and unsigned JWTs, documenting the findings and their security implications.',
    image: '/img/portfolio/projects/juice-shop.png',
    imageAlt: 'Design reference screenshot of the OWASP Juice Shop product overview',
    skillIds: ['security'],
    documentation: '/docs/projects/Juice Shop Master/',
    github: 'https://github.com/PhilippKlinger/my-dso-blog/tree/main/docs/projects/Juice%20Shop%20Master',
  },
  {
    id: 'minecraft',
    title: 'Minecraft Server',
    description: 'A Minecraft Java server with Fabric mods, packaged for local or VPS use. Built with Docker and Compose, featuring validated startup settings, a non-root process and persistent storage for worlds, configuration and mods.',
    image: '/img/portfolio/projects/minecraft.svg',
    imageAlt: 'Minecraft illustration with the game title and a creeper',
    skillIds: ['shell', 'yaml', 'containers', 'security'],
    documentation: '/docs/projects/minecraft-server',
    github: 'https://github.com/PhilippKlinger/minecraft-server',
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    description: 'WordPress and MariaDB running as separate Docker Compose services. The setup connects the application to a healthchecked database and keeps posts, uploads and database data in persistent volumes, with credentials supplied through environment variables.',
    image: '/img/portfolio/projects/wordpress.svg',
    imageAlt: 'WordPress illustration with its logo and a website on a laptop',
    skillIds: ['yaml', 'containers'],
    documentation: '/docs/projects/wordpress-multicontainer-setup',
    github: 'https://github.com/PhilippKlinger/wordpress-multicontainer-setup',
  },
];

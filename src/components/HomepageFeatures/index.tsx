import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: React.JSX.Element;
  to: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Minecraft Server',
    description: (
      <>
        A Dockerized Minecraft Java Edition server with Fabric mod support and
        persistent state managed by Docker Compose.
      </>
    ),
    to: '/docs/projects/minecraft-server',
  },
  {
    title: 'WordPress Multi-Container Setup',
    description: (
      <>
        WordPress and MariaDB run as separate services with persistent volumes
        and environment-based configuration.
      </>
    ),
    to: '/docs/projects/wordpress-multicontainer-setup',
  },
  {
    title: 'Conduit Container',
    description: (
      <>
        An Angular frontend, Django REST backend, and PostgreSQL database
        packaged for Docker Compose.
      </>
    ),
    to: '/docs/projects/conduit-container',
  },
];

function Feature({title, description, to}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureColumn)}>
      <div className={styles.featureCard}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={to}>View project</Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

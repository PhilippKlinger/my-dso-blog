import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

/** Lists the training reports at their existing documentation URLs. */
export default function Home(): React.JSX.Element {
  return (
    <Layout description="Project reports from my DevSecOps training: tasks, implementation, results, and lessons learned.">
      <main className={styles.page}>
        <header className={styles.introduction}>
          <h1>DevSecOps Learning Journal</h1>
          <p>
            Project reports from my DevSecOps training: tasks, implementation,
            results, and lessons learned.
          </p>
        </header>

        <section aria-labelledby="project-reports">
          <h2 id="project-reports" className={styles.sectionTitle}>Project reports</h2>
          <ul className={styles.reports}>
            <li>
              <h3><Link to="/docs/projects/docusaurus-blog/">Docusaurus Blog</Link></h3>
              <p>Configuring and deploying this documentation site.</p>
            </li>
            <li>
              <h3><Link to="/docs/projects/v-server-setup/">V-Server Setup and Hardening</Link></h3>
              <p>Setting up and operating a Linux server with a TLS reverse proxy and automated delivery.</p>
            </li>
            <li>
              <h3><Link to="/docs/projects/baby-tools-shop/">Baby Tools Shop</Link></h3>
              <p>Containerizing a Django shop with persistent data and uploaded media.</p>
            </li>
            <li>
              <h3><Link to="/docs/projects/minecraft-server/">Minecraft Server</Link></h3>
              <p>Building a Fabric-enabled Java server image with persistent world data.</p>
            </li>
            <li>
              <h3><Link to="/docs/projects/wordpress-multicontainer-setup/">WordPress Multi-Container Setup</Link></h3>
              <p>Running WordPress and MariaDB with healthchecks and persistent data.</p>
            </li>
            <li>
              <h3><Link to="/docs/projects/conduit-container/">Conduit Container</Link></h3>
              <p>Combining an Angular frontend, Django backend, and PostgreSQL database with Docker Compose.</p>
            </li>
            <li>
              <h3><Link to="/docs/projects/conduit-deployment/">Conduit Deployment</Link></h3>
              <p>Building versioned images and deploying the application through GitHub Actions.</p>
            </li>
            <li>
              <h3><Link to="/docs/projects/truck-signs-api/">Truck Signs API</Link></h3>
              <p>Repairing a Django API's Docker Compose setup with PostgreSQL and persistent data.</p>
            </li>
            <li>
              <h3><Link to="/docs/projects/Juice%20Shop%20Master/">Juice Shop Master</Link></h3>
              <p>Documenting three security challenges in an authorized training lab.</p>
              <ul className={styles.challenges}>
                <li>
                  <Link to="/docs/projects/Juice%20Shop%20Master/database-schema/">Database Schema</Link>
                  <p>Investigating SQL injection to retrieve the training application's database schema.</p>
                </li>
                <li>
                  <Link to="/docs/projects/Juice%20Shop%20Master/misplaced-signature-file/">Misplaced Signature File</Link>
                  <p>Investigating an exposed monitoring rule in the training application.</p>
                </li>
                <li>
                  <Link to="/docs/projects/Juice%20Shop%20Master/unsigned-jwt/">Unsigned JWT</Link>
                  <p>Testing how the training application handles an unsigned token.</p>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}

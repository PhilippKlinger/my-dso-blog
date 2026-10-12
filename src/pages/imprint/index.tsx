import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import portfolioStyles from '@site/src/css/portfolio.module.css';
import styles from './imprint.module.css';

export default function Imprint(): React.JSX.Element {
  return (
    <Layout
      title="Legal Notice"
      description="Provider and contact information for Philipp Klinger's DevSecOps portfolio.">
      <main className={`${portfolioStyles.portfolio} ${styles.page}`}>
        <div className={styles.content}>
          <h1>Legal Notice (Impressum)</h1>
          <section aria-labelledby="imprint-provider">
            <h2 id="imprint-provider">Provider</h2>
            <address className={styles.address}>
              Philipp Klinger<br />
              Ostlandstraße 11<br />
              49504 Lotte<br />
              Germany
            </address>
          </section>
          <section aria-labelledby="imprint-contact">
            <h2 id="imprint-contact">Contact</h2>
            <p>
              Email: <a href="mailto:hello@philipp-klinger.com">hello@philipp-klinger.com</a>
            </p>
            <p>
              LinkedIn: <a href="https://www.linkedin.com/in/philipp-klinger/">Philipp Klinger</a>
            </p>
          </section>
          <section aria-labelledby="imprint-editorial">
            <h2 id="imprint-editorial">Responsible for editorial content</h2>
            <p>
              Philipp Klinger, at the address stated above, pursuant to Section
              18(2) MStV.
            </p>
          </section>
          <Link to="/" className={styles.backLink}>Back to portfolio</Link>
        </div>
      </main>
    </Layout>
  );
}

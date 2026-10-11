import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/hero-section';
import SkillsSection from '@site/src/components/skills-section';

import styles from '@site/src/css/portfolio.module.css';

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Philipp Klinger's DevSecOps portfolio documenting projects, secure delivery practices, and lessons learned.">
      <main className={styles.portfolio}>
        <HeroSection />
        <SkillsSection />
      </main>
    </Layout>
  );
}

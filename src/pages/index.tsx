import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/hero-section';
import SkillsSection from '@site/src/components/skills-section';
import ProjectHighlights from '@site/src/components/project-highlights';
import ContactSection from '@site/src/components/contact-section';
import PortfolioFooter from '@site/src/components/portfolio-footer';

import styles from '@site/src/css/portfolio.module.css';

/**
 * Assembles the portfolio sections within the Docusaurus page layout.
 *
 * @remarks
 * The Navbar theme adapter supplies the header. The layout's default footer
 * is disabled here because this page renders its own portfolio footer.
 */
export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      noFooter
      title={siteConfig.title}
      description="Philipp Klinger's DevSecOps portfolio documenting projects, secure delivery practices, and lessons learned.">
      <main className={styles.portfolio}>
        <HeroSection />
        <SkillsSection />
        <ProjectHighlights />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </Layout>
  );
}

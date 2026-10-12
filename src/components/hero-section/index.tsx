import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './hero-section.module.css';

export default function HeroSection(): React.JSX.Element {
  const portraitUrl = useBaseUrl('/img/portfolio/portrait.png');

  return (
    <section id="about" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <div className={styles.introduction}>
          <p className={styles.greeting}>
            Hey there. <span aria-hidden="true">👋</span> I am
          </p>
          <h1 id="hero-title" className={styles.name}>
            Philipp Klinger
          </h1>
          <p className={styles.role}>
            Full-Stack Developer &amp; DevSecOps Enthusiast
          </p>
        </div>
        <img
          className={styles.portrait}
          src={portraitUrl}
          alt="Philipp Klinger"
          width={1572}
          height={1572}
          fetchPriority="high"
        />
        <p className={styles.description}>
          I build web applications with TypeScript, Angular, Python and Django.
          My DevSecOps projects bring that experience together with Linux,
          containers, CI/CD and application security. I enjoy solving practical
          problems and making software easier to maintain. Here, I share my
          projects and the decisions behind them.
        </p>
        <a className={styles.contactLink} href="mailto:hello@philipp-klinger.com">
          Contact me
        </a>
      </div>
    </section>
  );
}

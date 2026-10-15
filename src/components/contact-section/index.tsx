import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './contact-section.module.css';

/** Displays the public email and LinkedIn contact options. */
export default function ContactSection(): React.JSX.Element {
  const mailIcon = useBaseUrl('/img/portfolio/contact/mail.svg');
  const linkedInIcon = useBaseUrl('/img/portfolio/contact/linkedin.svg');

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.content}>
        <h2 id="contact-title" className={styles.heading}>
          Contact me
        </h2>
        <p className={styles.description}>
          Have a question about one of my projects or an opportunity in mind?
          I’d be happy to talk about the work and how I could contribute.
        </p>
        <p className={styles.invitation}>You can reach me by email or on LinkedIn.</p>
        <ul className={styles.links} aria-label="Contact options">
          <li>
            <a className={styles.link} href="mailto:hello@philipp-klinger.com">
              <img className={styles.icon} src={mailIcon} alt="" width={32} height={32} />
              <span>hello@philipp-klinger.com</span>
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href="https://www.linkedin.com/in/philipp-klinger/"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer">
              <img className={styles.icon} src={linkedInIcon} alt="" width={32} height={32} />
              <span className={styles.profileLabel}>Profile Page</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

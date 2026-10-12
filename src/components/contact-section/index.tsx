import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './contact-section.module.css';

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
          Interested in my work or have a project in mind? Feel free to get in
          touch. My experience combines full-stack development with practical
          DevSecOps projects, from containers and CI/CD to application security.
          I’d be happy to discuss your ideas and how I could contribute.
        </p>
        <p className={styles.invitation}>Looking forward to hearing from you!</p>
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

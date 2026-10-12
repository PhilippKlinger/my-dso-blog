import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Project} from '@site/src/data/projects';
import {skills} from '@site/src/data/skills';
import styles from './project-card.module.css';

interface ProjectCardProps {
  project: Project;
  number: number;
}

const badgeIcons: Record<string, string> = {
  shell: '/img/portfolio/projects/badges/shell.svg',
  yaml: '/img/portfolio/projects/badges/yaml.svg',
};

export default function ProjectCard({project, number}: ProjectCardProps): React.JSX.Element {
  const imageUrl = useBaseUrl(project.image);
  const iconBaseUrl = useBaseUrl('/');
  const titleId = `project-${project.id}-title`;
  const technologies = skills.filter(skill => project.skillIds.includes(skill.id));

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h3 id={titleId} className={styles.title}>
          <span className={styles.number} aria-hidden="true">{number}. </span>
          {project.title}
        </h3>
        <ul className={styles.badges} aria-label="Project technologies and skills">
          {technologies.map(skill => (
            <li key={skill.id} className={styles.badge}>
              <img src={`${iconBaseUrl}${(badgeIcons[skill.id] ?? skill.icon).replace(/^\//, '')}`} alt="" width={30} height={30} loading="lazy" />
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
      </header>
      <div className={styles.body}>
        <img
          className={styles.image}
          src={imageUrl}
          alt={project.imageAlt}
          width={355}
          height={240}
          loading="lazy" />
        <div className={styles.details}>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.actions}>
            <Link className={styles.documentation} to={project.documentation} target="_blank" rel="noopener noreferrer">Documentation</Link>
            <a className={styles.github} href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </article>
  );
}

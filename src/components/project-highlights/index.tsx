import {useState} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import ProjectCard from '@site/src/components/project-card';
import {projects} from '@site/src/data/projects';
import styles from './project-highlights.module.css';

export default function ProjectHighlights(): React.JSX.Element {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.content}>
        <Heading as="h2" id="projects-title" className={styles.heading}>My project highlights</Heading>
        <div className={styles.layout}>
          <ol className={styles.selection} aria-label="Project selection">
            {projects.map(project => (
              <li key={project.id}>
                <button
                  type="button"
                  aria-pressed={selectedProject === project.id}
                  aria-controls={`highlight-${project.id}`}
                  onClick={() => setSelectedProject(project.id)}>{project.title}</button>
              </li>
            ))}
          </ol>
          <div className={styles.cards}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                id={`highlight-${project.id}`}
                className={styles.project}
                data-selected={selectedProject === project.id}>
                <ProjectCard project={project} number={index + 1} />
              </div>
            ))}
          </div>
          <div className={styles.moreProjects}>
            <p className={styles.moreText}>
              Explore more projects covering web development, containers, server setup and application security.
            </p>
            <Link to="/docs/projects"><span aria-hidden="true">↳ </span>see more projects</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

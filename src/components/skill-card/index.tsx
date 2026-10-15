import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Skill} from '@site/src/data/skills';
import styles from './skill-card.module.css';

/** Content for a skill card. */
export interface SkillCardProps {
  /** Skill identity, icon and examples of its use. */
  skill: Skill;
}

/**
 * Displays a skill and examples of how it was used.
 *
 * @remarks
 * CSS reveals the examples on hover or keyboard focus on desktop and keeps
 * them visible on mobile. Render each skill ID only once per page because it
 * also identifies the card's accessible title and description.
 *
 * @param props - Skill content to display.
 */
export default function SkillCard({skill}: SkillCardProps): React.JSX.Element {
  const labelId = `skill-${skill.id}`;
  const detailsId = `${labelId}-details`;

  return (
    <article
      className={styles.card}
      tabIndex={0}
      aria-labelledby={labelId}
      aria-describedby={detailsId}>
      <div className={styles.identity}>
        <img src={useBaseUrl(skill.icon)} alt="" width={80} height={80} loading="lazy" />
        <h3 id={labelId} className={styles.name}>{skill.name}</h3>
      </div>
      <div className={styles.details}>
        <p className={styles.detailHeading}>How I used this skill</p>
        <ul id={detailsId}>
          {skill.details.map(detail => <li key={detail}>{detail}</li>)}
        </ul>
      </div>
    </article>
  );
}

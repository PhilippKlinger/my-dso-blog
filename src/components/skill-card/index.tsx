import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Skill} from '@site/src/data/skills';
import styles from './skill-card.module.css';

type Props = {skill: Skill};

export default function SkillCard({skill}: Props): React.JSX.Element {
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
      <ul id={detailsId} className={styles.details}>
        {skill.details.map(detail => <li key={detail}>{detail}</li>)}
      </ul>
    </article>
  );
}

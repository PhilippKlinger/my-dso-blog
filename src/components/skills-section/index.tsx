import {useEffect, useRef, useState, type KeyboardEvent} from 'react';
import Heading from '@theme/Heading';
import SkillCard from '@site/src/components/skill-card';
import {skills} from '@site/src/data/skills';
import styles from './skills-section.module.css';

const groups = Array.from({length: Math.ceil(skills.length / 3)}, (_, index) =>
  skills.slice(index * 3, index * 3 + 3));

/**
 * Displays the skill grid and its mobile groups of up to three cards.
 *
 * @remarks
 * On mobile, native scrolling, group buttons and arrow keys share the same
 * scroll position. Arrow keys are handled only when the track itself has
 * focus. Button and keyboard scrolling respect reduced-motion preferences.
 * Crossing the 996px breakpoint keeps a focused card's group in view.
 */
export default function SkillsSection(): React.JSX.Element {
  const [activeGroup, setActiveGroup] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 996px)');
    function resetGroup() {
      const track = trackRef.current;
      if (!track) return;
      // Keep a focused card visible when the desktop grid becomes a carousel.
      const focusedGroup = mobile.matches
        ? Array.from(track.children).findIndex(group => group.contains(document.activeElement))
        : 0;
      const index = Math.max(0, focusedGroup);
      track.scrollLeft = index * track.clientWidth;
      setActiveGroup(index);
    }
    mobile.addEventListener('change', resetGroup);
    return () => mobile.removeEventListener('change', resetGroup);
  }, []);

  /**
   * Scrolls to a group; the scroll handler updates the active group indicator.
   *
   * @param index - Zero-based position of an existing group.
   */
  function selectGroup(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({left: index * track.clientWidth, behavior: reducedMotion ? 'auto' : 'smooth'});
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      selectGroup(Math.max(0, Math.min(groups.length - 1, activeGroup + direction)));
    }
  }

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className={styles.content}>
        <Heading as="h2" id="skills-title" className={styles.heading}>My skills</Heading>
        <div
          ref={trackRef}
          id="skill-groups"
          className={styles.track}
          role="region"
          aria-label="Skill groups"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onScroll={event => {
            const track = event.currentTarget;
            if (track.clientWidth > 0) {
              setActiveGroup(Math.max(0, Math.min(groups.length - 1,
                Math.round(track.scrollLeft / track.clientWidth))));
            }
          }}>
          {groups.map((group, index) => (
            <div key={group[0].id} className={styles.group} role="group" aria-label={`Skills ${index + 1} of ${groups.length}`}>
              {group.map(skill => <SkillCard key={skill.id} skill={skill} />)}
            </div>
          ))}
        </div>
        <div className={styles.controls} role="group" aria-label="Skill group selection">
          {groups.map((group, index) => (
            <button
              key={group[0].id}
              type="button"
              className={styles.dot}
              aria-label={`Show skill group ${index + 1} of ${groups.length}`}
              aria-controls="skill-groups"
              aria-pressed={activeGroup === index}
              onClick={() => selectGroup(index)} />
          ))}
        </div>
      </div>
    </section>
  );
}

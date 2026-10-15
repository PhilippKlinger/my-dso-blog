import {useEffect, useRef, useState, type KeyboardEvent} from 'react';
import portfolioStyles from '@site/src/css/portfolio.module.css';
import styles from './portfolio-header.module.css';

const links = [
  {href: '#about', label: 'About me'},
  {href: '#skills', label: 'My skills'},
  {href: '#projects', label: 'My projects'},
  {href: '#contact', label: 'Contact'},
];

/**
 * Provides the homepage navigation and its mobile menu.
 *
 * @remarks
 * The header hides while scrolling down, but stays visible while the menu is
 * open or navigation has focus. Opening the menu focuses its first link;
 * Escape and link activation return focus to the menu button before closing.
 * Crossing the 996px breakpoint resets the menu and keeps focus on a visible
 * navigation control. Keep this breakpoint aligned with the component CSS.
 */
export default function PortfolioHeader(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isMenuOpen) navigationRef.current?.querySelector('a')?.focus();
  }, [isMenuOpen]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 996px)');
    function handleResize() {
      setIsMenuOpen(false);
      setIsHidden(false);
      if (headerRef.current?.contains(document.activeElement)) {
        if (mobile.matches) toggleRef.current?.focus();
        else navigationRef.current?.querySelector('a')?.focus();
      }
    }
    mobile.addEventListener('change', handleResize);
    return () => mobile.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    let previousY = window.scrollY;
    function handleScroll() {
      const currentY = Math.max(0, window.scrollY);
      // Ignore small scroll fluctuations; keep focused/open navigation visible.
      if (Math.abs(currentY - previousY) < 8 && currentY > 0) return;
      const header = headerRef.current;
      setIsHidden(!isMenuOpen && !header?.contains(document.activeElement)
        && currentY > (header?.offsetHeight ?? 0) && currentY > previousY);
      previousY = currentY;
    }
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  /** Returns focus to the toggle before the mobile links are hidden. */
  function closeMenu() {
    toggleRef.current?.focus();
    setIsMenuOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && isMenuOpen) {
      event.preventDefault();
      closeMenu();
    }
  }

  return (
    <header
      ref={headerRef}
      className={`${portfolioStyles.portfolio} ${styles.header}`}
      data-hidden={isHidden}
      onFocusCapture={() => setIsHidden(false)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false);
      }}
      onKeyDown={handleKeyDown}>
      <div className={styles.content}>
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMenuOpen}
          aria-controls="portfolio-navigation"
          onClick={() => setIsMenuOpen(open => !open)}>
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>
        <nav
          ref={navigationRef}
          id="portfolio-navigation"
          className={styles.navigation}
          aria-label="Portfolio"
          data-open={isMenuOpen}>
          {links.map(link => (
            <a key={link.href} href={link.href} onClick={() => {
              if (isMenuOpen) closeMenu();
            }}>{link.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

import {isMultiColumnFooterLinks, useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import FooterLinkItem from '@theme/Footer/LinkItem';
import portfolioStyles from '@site/src/css/portfolio.module.css';
import styles from './portfolio-footer.module.css';

export default function PortfolioFooter(): React.JSX.Element {
  const {footer} = useThemeConfig();
  const arrow = useBaseUrl('/img/portfolio/footer/back-to-top.svg');
  const links = footer
    ? isMultiColumnFooterLinks(footer.links)
      ? footer.links.flatMap(column => column.items)
      : footer.links
    : [];
  const legalNotice = links.find(item => item.label === 'Legal Notice');
  const references = links.filter(item => item !== legalNotice);

  return (
    <footer
      className={`${portfolioStyles.portfolio} ${styles.footer}`}
      aria-label="Portfolio footer">
      <div className={styles.content}>
        <a className={styles.backToTop} href="#top" aria-label="Back to top">
          <img src={arrow} alt="" width={40} height={90} />
        </a>
        <div className={styles.information}>
          <p className={styles.copyright}>{footer?.copyright}</p>
          {legalNotice && (
            <FooterLinkItem item={{...legalNotice, className: styles.legalNotice}} />
          )}
          <ul className={styles.references} aria-label="Site references">
            {references.map(item => (
              <li key={item.to ?? item.href ?? item.label}>
                <FooterLinkItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

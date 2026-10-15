import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import OriginalNavbar from '@theme-original/Navbar';
import PortfolioHeader from '@site/src/components/portfolio-header';

/**
 * Uses the portfolio header on the homepage and the original navbar elsewhere.
 *
 * @remarks
 * The homepage comparison includes Docusaurus's configured base URL and ignores
 * a trailing slash, so documentation and legal-notice routes keep their normal
 * navigation when the site is hosted under a repository path.
 */
export default function Navbar(): React.JSX.Element {
  const {pathname} = useLocation();
  const homepage = useBaseUrl('/');
  const isHomepage = pathname.replace(/\/$/, '') === homepage.replace(/\/$/, '');

  return isHomepage ? <PortfolioHeader /> : <OriginalNavbar />;
}

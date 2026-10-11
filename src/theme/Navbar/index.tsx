import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import OriginalNavbar from '@theme-original/Navbar';
import PortfolioHeader from '@site/src/components/portfolio-header';

export default function Navbar(): React.JSX.Element {
  const {pathname} = useLocation();
  const homepage = useBaseUrl('/');
  const isHomepage = pathname.replace(/\/$/, '') === homepage.replace(/\/$/, '');

  return isHomepage ? <PortfolioHeader /> : <OriginalNavbar />;
}

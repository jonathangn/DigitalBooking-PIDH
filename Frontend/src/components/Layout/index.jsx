import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import OfflineBanner from '../OfflineBanner/OfflineBanner';

const Layout = ({ children, auth }) => {
  return (
    <>
      <OfflineBanner />
      <Header auth={auth} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100%',
        overflowX: 'hidden',
      }}>
      <Navbar />
      <div
        className='columns mt-6'
        style={{
          minHeight: '100vh',
          padding: '0 5px',
        }}>
        <div className='column is-2 is-hidden-mobile'>
          <Sidebar />
        </div>
        <div className='column has-background-light' style={{ height: '100vh' }}>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

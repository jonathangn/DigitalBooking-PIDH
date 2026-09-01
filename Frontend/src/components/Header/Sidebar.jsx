import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import { useAuthHeader } from './useAuthHeader';

const SocialIcons = () => (
  <div className="icons">
    <BsFacebook />
    <FaLinkedinIn />
    <BsTwitter />
    <BsInstagram />
  </div>
);

function Sidebar({ sidebar, showSidebar, variant }) {
  const { decodedToken, closeSession } = useAuthHeader();

  const open = sidebar ? 'nav-menu active' : 'nav-menu';
  const isAuth = variant === 'user' || variant === 'admin';

  if (isAuth) {
    const target = variant === 'admin' ? '/admin' : '/reservations';
    const label = variant === 'admin' ? 'Administración' : 'Mis reservas';
    return (
      <div className={open}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <div className="upper-navbar">
            <li className="navbar-toggle">
              <p className="menu-bars" onClick={showSidebar}>
                X
              </p>
              <div className="avatar-mobile">
                <div className="avatar">
                  <h4>
                    {decodedToken?.nombre?.charAt(0).toUpperCase()}
                    {decodedToken?.apellido?.charAt(0).toUpperCase()}
                  </h4>
                </div>
                <h4 style={{ color: '#fff' }}>Hola, </h4>
                <h4 style={{ color: '#383B58' }}>
                  {decodedToken?.nombre} {decodedToken?.apellido}
                </h4>
              </div>
            </li>
          </div>
          <li className="nav-text">
            <Link to={target}>{label}</Link>
          </li>
          <div className="navbar-footer">
            <div className="footer-icons">
              <h4 className="cerrar-sesion" onClick={closeSession}>
                ¿Deseas<span style={{ color: '#1DBEB4' }}>cerrar sesión?</span>
              </h4>
              <hr className="hr-nav" />
              <BsFacebook />
              <FaLinkedinIn />
              <BsTwitter />
              <BsInstagram />
            </div>
          </div>
        </ul>
      </div>
    );
  }

  const links =
    variant === 'signup'
      ? [{ to: '/login', label: 'Iniciar sesión' }]
      : variant === 'login'
        ? [{ to: '/signup', label: 'Crear cuenta' }]
        : [
            { to: '/signup', label: 'Crear cuenta' },
            { to: '/login', label: 'Iniciar sesión' },
          ];

  return (
    <div className={open}>
      <ul className="nav-menu-items" onClick={showSidebar}>
        <div className="upper-navbar">
          <li className="navbar-toggle">
            <p className="menu-bars" onClick={showSidebar}>
              X
            </p>
            <h5>MENÚ</h5>
          </li>
        </div>
        {links.map((link, index) => (
          <Fragment key={link.label}>
            {index > 0 && <hr className="hr-header" />}
            <li className="nav-text">
              <Link to={link.to}>{link.label}</Link>
            </li>
          </Fragment>
        ))}
        <SocialIcons />
      </ul>
    </div>
  );
}

export default Sidebar;
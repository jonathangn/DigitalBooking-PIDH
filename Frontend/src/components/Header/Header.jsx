import React from 'react';
import './Header.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import getRouteForAction from '../../utils/navigation';
import { FiMenu } from 'react-icons/fi';
import { useAuthHeader } from './useAuthHeader';
import Sidebar from './Sidebar';

function Header() {
  const { auth, admin, decodedToken, setWarning, closeSession } = useAuthHeader();

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [sidebar, setSidebar] = React.useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  function handleNavAction(evento) {
    navigate(getRouteForAction(evento));
  }

  const isSignupPage = location === '/signup';
  const isLoginPage = location === '/login';
  const variant = isSignupPage ? 'signup' : isLoginPage ? 'login' : !auth ? 'guest' : admin ? 'admin' : 'user';

  return (
    <nav>
      <div className="navbar-container">
        <Link to="/" className="logo-container">
          <img src="/images/logo.png" alt="logo" width="71" height="52" />
          <p>Sentite como en tu hogar</p>
        </Link>

        {isSignupPage && (
          <div className="button-container">
            <button onClick={() => handleNavAction(false)}>Iniciar sesión.</button>
          </div>
        )}
        {isLoginPage && (
          <div className="button-container">
            <button onClick={() => handleNavAction(true)}>Crear cuenta</button>
          </div>
        )}
        {!auth && !isSignupPage && !isLoginPage && (
          <div className="button-container">
            <button onClick={() => handleNavAction(true)}>Crear cuenta</button>
            <button
              onClick={() => {
                handleNavAction(false);
                setWarning(false);
              }}
            >
              Iniciar sesión
            </button>
          </div>
        )}
        {auth && !isSignupPage && !isLoginPage && (
          <div className="username-container">
            <Link to={admin ? '/admin' : '/reservations'} className="admin-title">
              {admin ? 'Administración' : 'Mis reservas'}
            </Link>
            <hr />
            <div className="avatar">
              <p>
                {decodedToken?.nombre?.charAt(0).toUpperCase()}
                {decodedToken?.apellido?.charAt(0).toUpperCase()}
              </p>
            </div>
            <div className="greetings">
              <h4 style={{ color: '#000', opacity: '50%' }}>Hola, </h4>
              <h4 style={{ color: '#1DBEB4' }}>
                {decodedToken?.nombre} {decodedToken?.apellido}
              </h4>
            </div>
            <h4 className="close" onClick={closeSession}>
              X
            </h4>
          </div>
        )}

        <div className="navbar">
          <Link to="#" className="hamburger-menu">
            <FiMenu style={{ color: '#545776' }} onClick={showSidebar} />
          </Link>
        </div>
      </div>

      <Sidebar sidebar={sidebar} showSidebar={showSidebar} variant={variant} />
    </nav>
  );
}

export default Header;
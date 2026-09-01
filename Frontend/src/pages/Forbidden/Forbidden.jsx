import { Link } from 'react-router-dom';
import './Forbidden.scss';

function Forbidden() {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="not-found-image-container">
          <div className="not-found-image"></div>
        </div>
        <div className="not-found-text">
          <div className="not-found-title">
            <h1>403</h1>
            <h1>No tenés permiso</h1>
          </div>
          <div className="bottom-not-found-text">
            <p>
              Esta sección es solo para administradores. Iniciá sesión con una cuenta con permisos
              de administración.
            </p>
            <Link to="/" className="forbidden-link">
              Volver al home
            </Link>
            <Link to="/login" className="forbidden-link">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forbidden;

import { useNavigate } from 'react-router-dom';
import './NotFound.scss';
import getRouteForAction from '../../utils/navigation';

function NotFound() {
  const navigate = useNavigate();

  function handleNavAction(evento) {
    navigate(getRouteForAction(evento));
  }

  return (
    <>
      <div className="not-found">
        <div className="not-found-container">
          <div className="not-found-image-container">
            <div className="not-found-image"></div>
          </div>
          <div className="not-found-text">
            <div className="not-found-title">
              <h1>¡Ups!</h1>
              <h1>Lo sentimos</h1>
            </div>
            <div className="bottom-not-found-text">
              <p>Esta página no está disponible o no tienes permiso para acceder.</p>
              <button onClick={() => handleNavAction()}>Volver al home</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;

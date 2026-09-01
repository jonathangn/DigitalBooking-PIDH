import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';

export const Guardian = ({ children, adminOnly = false }) => {
  const { auth, authReady, admin } = useContext(Context);
  const location = useLocation();

  if (!authReady) {
    return (
      <div className="loading-data">
        <h3>Cargando...</h3>
      </div>
    );
  }

  if (!auth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && !admin) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export const ProtectedRoute = Guardian;

export default Guardian;

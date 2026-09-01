import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearToken } from '../../Helpers/auth';
import { Context } from '../../context/Context';

export function useAuthHeader() {
  const { auth, admin, decodedToken, setToken, setWarning } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  function closeSession() {
    clearToken();
    setToken(null);
    navigate('/');
    if (location === '/') {
      window.location.reload();
    }
  }

  return { auth, admin, decodedToken, setToken, setWarning, closeSession };
}
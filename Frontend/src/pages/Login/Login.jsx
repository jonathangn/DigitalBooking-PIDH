import React, { useContext } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import axiosClient from '../../Helpers/axiosClient';

function Login() {
  const { warning, setToken } = useContext(Context);
  const [errorPost, setErrorPost] = React.useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState({ campo: '', error: null });
  const [password, setPassword] = React.useState({ campo: '', error: null });

  const onChangeEmail = (e) => {
    setEmail({ ...email, campo: e.target.value });
  };
  const onChangePassword = (e) => {
    setPassword({ ...password, campo: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postUser();
  };

  async function postUser() {
    axiosClient
      .post(`authenticate`, {
        email: email.campo,
        password: password.campo,
      })
      .then(function (response) {
        setToken(response.data.jwt);
        navigate('/');
      })
      .catch(function () {
        setErrorPost(true);
      });
  }

  return (
    <>
      <div className="login">
        <div className="form-container">
          <form onSubmit={onSubmit}>
            {warning ? (
              <div className="warning" style={{ display: 'flex' }}>
                <img
                  src="/images/warning.png"
                  alt="warning"
                  loading="lazy"
                  width="31"
                  height="31"
                />
                <p>Para realizar una reserva necesitas estar logueado</p>
              </div>
            ) : null}
            <h1>Iniciar sesión</h1>
            {errorPost && (
              <div className="error">
                <small>
                  Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde
                </small>
              </div>
            )}
            <label htmlFor="email">Correo electrónico</label>
            <input
              className={email.error ? 'hasError' : 'noError'}
              type="email"
              name="email"
              value={email.campo}
              onChange={onChangeEmail}
              autoComplete="current-email"
            />
            <label htmlFor="password">Contraseña</label>
            <input
              className={password.error ? 'hasError' : 'noError'}
              type="password"
              name="password"
              value={password.campo}
              onChange={onChangePassword}
              autoComplete="current-password"
            />
            {(email.error || password.error) && (
              <div className="error">
                <small>Por favor vuelva a intentarlo, sus credenciales son inválidas</small>
              </div>
            )}
            <button name="ingresar">Ingresar</button>
          </form>
          <span>
            ¿Aún no tenes cuenta?{' '}
            <Link to="/signup" style={{ color: '#5993F5' }}>
              Registrate
            </Link>{' '}
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;

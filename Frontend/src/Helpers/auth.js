const TOKEN_KEY = 'token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function decodeToken(token) {
  if (!token) return { user: null, isAdmin: false, isExpired: false };
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    const isExpired = payload.exp * 1000 < Date.now();
    const rolNombre = typeof payload.rol === 'string' ? payload.rol : payload.rol?.nombre;
    return {
      user: {
        id: payload.id,
        nombre: payload.nombre,
        apellido: payload.apellido,
        email: payload.sub,
        rol: payload.rol,
      },
      isAdmin: rolNombre === 'Administrador',
      isExpired,
    };
  } catch (error) {
    console.error('Error decoding token', error);
    return { user: null, isAdmin: false, isExpired: false };
  }
}

export function isAdminToken(token) {
  return decodeToken(token)?.isAdmin === true;
}

export function logout() {
  clearToken();
  window.location.href = '/login';
}

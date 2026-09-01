import { getToken } from '../Helpers/auth';

export class ApiError extends Error {
  constructor(status, message = '', data = null) {
    super(message);
    this.status = status;
    this.data = data;
  }

  get isNetworkError() {
    return this.status === 'NETWORK';
  }

  get isTimeout() {
    return this.status === 'TIMEOUT';
  }
}

const TIMEOUT_MS = 10000;

function isAbortError(error) {
  return error?.name === 'AbortError' || error?.code === 'ERR_CANCELED';
}

function isNetworkError(error) {
  return (
    error instanceof TypeError ||
    error?.code === 'ERR_NETWORK' ||
    error?.code === 'ECONNABORTED' ||
    /failed to fetch|networkerror/i.test(error?.message || '')
  );
}

export function normalizeError(error) {
  if (error instanceof ApiError) {
    return error;
  }

  if (isAbortError(error)) {
    console.error(error);
    return new ApiError('TIMEOUT', 'La conexión tardó demasiado. Intentalo de nuevo.');
  }

  if (isNetworkError(error)) {
    console.error(error);
    return new ApiError('NETWORK', 'No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.');
  }

  const status = error?.response?.status ?? error?.status;
  const statusText = error?.response?.statusText ?? error?.statusText ?? error?.message;
  const data = error?.response?.data ?? error?.data;

  if (status) {
    console.error(error);
    return new ApiError(status, statusText || `Error ${status}`, data);
  }

  console.error(error);
  return new ApiError(0, 'Ocurrió un error inesperado. Intentalo de nuevo.');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchJsonTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });

    const bodyText = await response.text();
    let body = null;
    try {
      body = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      body = bodyText || null;
    }

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText, body);
    }

    return body;
  } catch (error) {
    throw normalizeError(error);
  } finally {
    clearTimeout(timeout);
  }
}

export function apiGet(url) {
  return fetchJsonTimeout(url, {
    method: 'GET',
    headers: { ...authHeaders() },
  });
}

export function apiPost(url, body) {
  return fetchJsonTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
  });
}

export function apiPut(url, body) {
  return fetchJsonTimeout(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
  });
}

export function apiDelete(url) {
  return fetchJsonTimeout(url, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
}

export function logError(...args) {
  console.error(...args);
}

export function apiErrorMessage(error) {
  if (!error) return null;
  if (error.isTimeout) return 'La conexión tardó demasiado. Intentalo de nuevo.';
  if (error.isNetworkError) return 'No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.';
  if (Number(error.status) >= 500) return 'El servidor no respondió correctamente. Intentalo de nuevo.';
  if (typeof error.data === 'string' && error.data) return error.data;
  return 'Ocurrió un error inesperado. Intentalo de nuevo.';
}

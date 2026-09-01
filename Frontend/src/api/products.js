import axiosClient from '../Helpers/axiosClient';
import { normalizeError } from './client';

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function createProductWithImages(payload, images, token) {
  const headers = authHeaders(token);

  let response;
  try {
    response = await axiosClient.post('productos', JSON.stringify(payload), { headers });
  } catch (error) {
    throw normalizeError(error);
  }

  try {
    await Promise.all(
      (images || []).map((urlImg) =>
        axiosClient.post(
          'imagenes',
          { titulo: '', urlImg, producto: { id: response.data.id } },
          { headers }
        )
      )
    );
  } catch (error) {
    const normalized = normalizeError(error);
    normalized.imagesFailed = true;
    throw normalized;
  }

  return response.data;
}
export const fetchJson = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Request to ${url} failed with status ${response.status} ${response.statusText}`
    );
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(
      `Expected JSON from ${url} but received ${contentType || 'unknown content type'}`
    );
  }

  return response.json();
};

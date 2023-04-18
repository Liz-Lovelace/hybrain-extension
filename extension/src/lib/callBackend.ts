import { Settings } from './settings.ts';

export default async function callBackend(method, url, data = null) {
  const baseURL = await Settings.get('backendBaseURL');
  const fetchUrl = `${baseURL}${url}`;
  const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });

  const config = { method, headers, body: data ? JSON.stringify(data) : null };

  let response;
  try {
    response = await fetch(fetchUrl, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }

  return await response.json();
}

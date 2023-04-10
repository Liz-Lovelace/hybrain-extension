import axios from 'axios';
import { Settings } from './settings.ts';

export default async function callBackend(method, url, data = null) {
  const baseURL = await Settings.get('backendBaseURL');
  const config = {
    method,
    url: `${baseURL}${url}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: data ? JSON.stringify(data) : null
  };

  let response;
  try {
    response = await axios(config);
  } catch (err) {
    console.error(err);
    throw err;
  }

  return response.data;
}

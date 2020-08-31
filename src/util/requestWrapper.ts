import config from '../config';

export const CallApi = async (
  method: string,
  endpoint: string,
  token: string,
  body?: any
): Promise<any> => {
  let requestOptions = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body && { 'Content-Type': 'application/json' }), // conditionally add content header
    },
    ...(body && { body: JSON.stringify(body) }), // conditionally add body
  };

  const response = await fetch(`${config.apiUrl}${endpoint}`, requestOptions);

  return await response.json();
};

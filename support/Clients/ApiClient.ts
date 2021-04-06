import { trim } from '@/support/String';
import { Config } from '@/support/Config';
import client from '@/support/Clients/Client';
import { AxiosResponse } from 'axios';

export const apiClient = (method: string, url: string, payload: object, headers: {[key: string]: string}) => {
  const defaultHeaders: {[key: string]: string} = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Platform': `${Config.get('APP_PLATFORM')}`,
  };

  const apiUrl = trim('/', `${Config.get('APP_HOST_API')}`);
  const clientUrl = `${apiUrl}/${trim('/', url)}`;

  return client(method, { ...defaultHeaders, ...headers }, clientUrl, payload);
};

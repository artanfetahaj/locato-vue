import { trim } from '@/support/String';
import { Config } from '@/support/Config';
import client from '@/support/Clients/Client';
import { AxiosResponse } from 'axios';

export const rpcClient = (signature: string, body: object) => {
  const headers: {[key: string]: string} = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Platform': `${Config.get('APP_PLATFORM')}`,
  };

  const apiUrl = trim('/', `${Config.get('APP_HOST_RPC')}`);

  return client('POST', headers, apiUrl, {
    signature,
    body,
  });
};

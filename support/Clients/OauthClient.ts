import { trim } from '@/support/String';
import { Config } from '@/support/Config';
import client from '@/support/Clients/Client';
import { AxiosResponse } from 'axios';

export const createOauthAccessToken = (payload: OauthPayload): Promise<AxiosResponse> => {
  const oauthPayload: OauthPayload = { ...{
    // grant_type: 'password',
    // client_id: '2', 
    // // mfa: '123456',
    // client_secret: 'JFebeqMu4mXYfsnTOhFWkHvycbgpM2W2ccGkYP6N',
    // scope: '*',
  },
  ...payload };

  // client_secret: 'mmyjR1rTlWz1MXdiLVToIhTpVT0pG8vWyWh1u6Ao',

  const oauthHeaders: {[key:string]: string} = {
    Accept: 'application/json',
  };
  const apiHost = Config.get('APP_HOST_API') as string;
  const apiOauth = `${(apiHost)}/login`;
  
  return client('POST', oauthHeaders, apiOauth, oauthPayload);
};

export interface OauthPayload {
  grant_type?: 'password';
  client_id?: string;
  client_secret?: string;
  scope?: string;
  email?: string;
  password?: string;
}

/* eslint-disable */
import { trim } from '@/support/String';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Config } from '@/support/Config';
const Qs = require('qs');
import cookies from 'js-cookie';

let API = '';

export const objectToFormdata = (payload: any, form: any = null, namespace: any = null): FormData => {
  const fd: FormData = form || new FormData();
  let formKey: string | null = null;

  Object.keys(payload).forEach((key: string) => {
    if (namespace) {
      formKey = `${namespace}[${key}]`;
    } else {
      formKey = key;
    }
    if (typeof payload[key] === 'object' && !(payload[key] instanceof File)) {
      objectToFormdata(payload[key], fd, key);
    } else {
      fd.append(formKey, payload[key]);
    }
  });
  return fd;
};

export default (method: string, headers: {[key: string]: string}, url: string, payload: object) => {
  // console.log('[REQUEST]', {
  //   method,
  //   url,
  //   headers,
  // });

  API = Config.get('APP_HOST_API') as string;

  if (cookies.get('access')) {
    headers.Authorization = `Bearer ${cookies.get('access')}`;
  }

  const urlData = new URL(url);
  //remove port for production
  const baseUrl = trim('/', `${urlData.protocol}//${urlData.hostname}:${urlData.port}`);
  const pathUrl = `${urlData.pathname}${urlData.search}`;

  console.log('baseUrl', urlData);

  const client = axios.create({
    baseURL: baseUrl,
    headers,
    /* eslint-disable-next-line */
    paramsSerializer: (params: any) => Qs.stringify(params, { arrayFormat: 'brackets' }),
  });

  let hasFile = false;
  const keys = Object.keys(payload);
  let attributes = {};
  keys.forEach((property) => {
    if (
      (payload as any)[property] !== undefined
      && (payload as any)[property] !== null
      && (payload as any)[property].name !== undefined
      && (payload as any)[property].lastModified !== undefined
      && (payload as any)[property].size !== undefined
    ) {
      hasFile = true;
    }
  });

  if (hasFile) {
    attributes = objectToFormdata(payload);
  }

  if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
    attributes = {
      params: payload,
    };
  } else {
    attributes = payload;
  }

  return (client as any)
    /* eslint-disable-next-line */
    [method.toLowerCase()](pathUrl, attributes)
    .then((response: AxiosResponse) => Promise.resolve(response))
    .catch((error: AxiosError) => Promise.reject(error));
};

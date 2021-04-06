import { trim } from '@/support/String';
import { Config } from '@/support/Config';
import Axios, { AxiosResponse } from 'axios';
import cookies from 'js-cookie';
import { openDialog } from '@/support/Dialog';

export const blobClient = (method: string, url: string, headers: {[key: string]: string}, payload: object = {}): Promise<AxiosResponse> => {
  const defaultHeaders: {[key: string]: string} = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Platform': `${process.env.APP_PLATFORM}`,
    Authorization: `Bearer ${cookies.get('access')}`,
  };

  console.log('cookies', cookies.get('access'));

  const apiUrl = trim('/', `${process.env.APP_HOST_API}`);
  const blobUrl = `${apiUrl}/${trim('/', url)}`;

  const client = Axios.create({
    headers: { ...defaultHeaders, ...headers },
    responseType: 'blob',
  });

  return (client as any)
    [method.toLowerCase()](blobUrl, payload ? { params: payload } : {})
    .then((response: AxiosResponse) => {
      const windowUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = windowUrl;

      const disposition = response.request.getResponseHeader('Content-Disposition');
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      let name = '';
      if (matches != null && matches[1]) {
        name = matches[1].replace(/['"]/g, '');
      }
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      link.remove();

      Promise.resolve(response);
    })
    .catch(() => {
      openDialog({
        type: 'error',
        text: 'An unexpected error occured',
      });
    });
};

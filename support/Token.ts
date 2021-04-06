import Storage from '@/support/Storage';
import { isObject } from 'lodash';

export default class Token {
  public static title(): string {
    return 'token';
  }

  public static set(payload: string | TokenPayload, value?: string): void {
    console.log('set', payload, value);
    if (isObject(payload)) {
      Object.keys(payload).forEach((currentKey: string) => {
        Storage.set(currentKey, (payload as TokenPayload)[currentKey]);
      });
    } else {
      Storage.set(payload as string, value || '');
    }
  }

  public static get(key: string): string {
    return Storage.get(key) || '';
  }

  public static delete(key: string | string[]): void {
    if (! Array.isArray(key)) {
      Storage.delete(key);
    } else {
      key.forEach((currentKey: string) => {
        Storage.delete(currentKey);
      });
    }
  }
}

interface TokenPayload {
  [key: string]: string;
}

import { ConfigValue } from '@/support/Config';

const environments: Environment[] = [
  {
    hostnames: [
      'localhost',
    ],
    config: {
      APP_TITLE: process.env.VUE_APP_TITLE || '',
      APP_VERSION: process.env.VUE_APP_VERSION || '',
      APP_ENV: process.env.VUE_APP_ENV || '',
      APP_PLATFORM: process.env.VUE_APP_PLATFORM || '',

      APP_HOST_API: process.env.VUE_APP_HOST_API,
      APP_HOST_RPC: process.env.VUE_APP_HOST_RPC,
      APP_HOST_OAUTH: process.env.VUE_APP_HOST_OAUTH,
      APP_LOCAL_STORAGE_TOKEN: process.env.VUE_APP_LOCAL_STORAGE_TOKEN,
    },
  },
];

export default environments;

export interface Environment {
  hostnames: string[];
  config: { [key: string]: ConfigValue };
}

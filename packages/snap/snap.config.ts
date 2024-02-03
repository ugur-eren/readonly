// eslint-disable-next-line import/no-nodejs-modules
import {resolve} from 'path';

import type {SnapConfig} from '@metamask/snaps-cli';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
    stream: true,
    crypto: true,
  },
  environment: {
    DAPP_ORIGIN_PRODUCTION: 'https://readonly.online',
    DAPP_ORIGIN_DEVELOPMENT: 'http://localhost:3000',
    VITE_SNAP_ORIGIN: 'local:http://localhost:8080',
  },
  stats: {
    builtIns: {
      // The following builtins can be ignored. They are used by some of the
      // dependencies, but are not required by this snap.
      ignore: [],
    },
  },
};

export default config;

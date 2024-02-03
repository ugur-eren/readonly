/// <reference types="vite/client" />

import type {MetaMaskInpageProvider} from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider & {
      setProvider?: (provider: MetaMaskInpageProvider) => void;
      detected?: MetaMaskInpageProvider[];
      providers?: MetaMaskInpageProvider[];
    };
  }
}

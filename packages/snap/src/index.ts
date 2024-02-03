import {handleKeyringRequest} from '@metamask/keyring-api';
import type {OnKeyringRequestHandler} from '@metamask/snaps-types';

import {SimpleKeyring} from './keyring';
import {hasPermission} from './utils/permissions';
import {logger} from './utils/logger';
import {getState} from './state';

let keyring: SimpleKeyring;

const getKeyring = async (): Promise<SimpleKeyring> => {
  if (!keyring) {
    const state = await getState();

    keyring = new SimpleKeyring(state);
  }

  return keyring;
};

export const onKeyringRequest: OnKeyringRequestHandler = async ({origin, request}) => {
  logger.debug(`Keyring request (origin="${origin}"):`, JSON.stringify(request, undefined, 2));

  if (!hasPermission(origin, request.method)) {
    throw new Error(`Origin '${origin}' is not allowed to call '${request.method}'`);
  }

  return handleKeyringRequest(await getKeyring(), request);
};

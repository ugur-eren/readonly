import {v4 as uuid} from 'uuid';
import {
  emitSnapKeyringEvent,
  EthAccountType,
  KeyringEvent,
  type Keyring,
  type KeyringAccount,
  type KeyringRequest,
  type SubmitRequestResponse,
} from '@metamask/keyring-api';
import {type Json} from '@metamask/utils';
import type {SnapsGlobalObject} from '@metamask/snaps-types';

import {saveState, type State} from './state';
import {throwError} from './utils/helpers';
import {CreateAccountOptionsSchema} from './utils/zod';

export class SimpleKeyring implements Keyring {
  #state: State;

  constructor(state: State) {
    this.#state = state;
  }

  get #wallets() {
    return Object.values(this.#state.wallets);
  }

  get #idToWallets() {
    return this.#state.wallets;
  }

  #getWalletByIDSafe(id: string) {
    return this.#idToWallets[id] ?? throwError(`Account with id '${id}' not found`);
  }

  get #addressToWallets() {
    return Object.fromEntries(this.#wallets.map((wallet) => [wallet.account.address, wallet]));
  }

  async #saveState() {
    await saveState(this.#state);
  }

  async #emitEvent(event: KeyringEvent, data: Record<string, Json>): Promise<void> {
    await emitSnapKeyringEvent(snap as SnapsGlobalObject, event, data);
  }

  async listAccounts(): Promise<KeyringAccount[]> {
    return this.#wallets.map((wallet) => wallet.account);
  }

  async getAccount(id: string): Promise<KeyringAccount> {
    return this.#getWalletByIDSafe(id).account;
  }

  async createAccount(unsafeOptions: Record<string, Json> = {}): Promise<KeyringAccount> {
    const result = CreateAccountOptionsSchema.safeParse(unsafeOptions);
    if (!result.success) throwError(result.error.message);

    const address = result.data.address.toLowerCase();

    if (this.#addressToWallets[address]) {
      throwError(`Account address already in use: ${address}`);
    }

    try {
      const account = await this.#createAccount({address});

      return account;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  #createAccount = async (data: {address: string}): Promise<KeyringAccount> => {
    const account: KeyringAccount = {
      id: uuid(),
      options: {},
      address: data.address,
      methods: [],
      type: EthAccountType.Eoa,
    };

    await this.#emitEvent(KeyringEvent.AccountCreated, {account});

    this.#state.wallets[account.id] = {
      account,
    };

    await this.#saveState();

    return account;
  };

  async filterAccountChains(_id: string, chains: string[]): Promise<string[]> {
    // We're not filtering accounts by chain, so we just return the input chains.
    return chains;
  }

  async updateAccount(account: KeyringAccount): Promise<void> {
    const wallet = this.#getWalletByIDSafe(account.id);

    const newAccount: KeyringAccount = {
      ...wallet.account,
      ...account,

      // Restore read-only properties.
      address: wallet.account.address,
    };

    try {
      await this.#emitEvent(KeyringEvent.AccountUpdated, {
        account: newAccount,
      });

      wallet.account = newAccount;

      await this.#saveState();
    } catch (error) {
      throwError((error as Error).message);
    }
  }

  async deleteAccount(id: string): Promise<void> {
    this.#getWalletByIDSafe(id);

    try {
      await this.#emitEvent(KeyringEvent.AccountDeleted, {id});

      delete this.#state.wallets[id];

      await this.#saveState();
    } catch (error) {
      throwError((error as Error).message);
    }
  }

  async submitRequest(_request: KeyringRequest): Promise<SubmitRequestResponse> {
    throwError('Read-only keyring. Cannot submit requests');
  }

  // Async requests are not used in the current implementation.
  // The following methods are just stubs to satisfy the interface.
  async listRequests(): Promise<KeyringRequest[]> {
    return [];
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    throwError(`Request with id '${id}' not found`);
  }

  async approveRequest(id: string): Promise<void> {
    throwError(`Request with id '${id}' not found`);
  }

  async rejectRequest(id: string): Promise<void> {
    throwError(`Request with id '${id}' not found`);
  }
}

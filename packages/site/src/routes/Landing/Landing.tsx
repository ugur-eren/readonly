import {useState} from 'react';
import {KeyringSnapRpcClient} from '@metamask/keyring-api';
import {Button, Input} from '../../components';
import {useMetamask, useSnapAccounts, useSnapState} from '../../hooks';
import {SNAP_ORIGIN} from '../../utils/Env';

export const Landing: React.FC = () => {
  const [, , installSnap] = useMetamask();
  const snapState = useSnapState();
  const [snapAccounts, reloadSnapAccounts] = useSnapAccounts();

  const [addressInput, setAddressInput] = useState('');

  const addAccount = async () => {
    try {
      const client = new KeyringSnapRpcClient(SNAP_ORIGIN, window.ethereum);

      await client.createAccount({
        address: addressInput,
      });

      setAddressInput('');
    } catch (error) {
      console.error(error);
    } finally {
      reloadSnapAccounts();
    }
  };

  return (
    <div className="flex h-dvh flex-1 flex-col items-center px-8 md:px-16">
      <div className="flex flex-col items-center py-14 text-center md:py-28">
        <h1 className="text-4xl">ReadOnly</h1>
        <h2 className="text-xl">View and interact with your accounts directly on MetaMask.</h2>
      </div>

      <div className="flex flex-col items-center">
        {!snapState.flaskInstalled ? (
          <div className="text-center">
            <h1 className="mb-2 text-xl">MetaMask Flask not installed</h1>
            <p className="mb-12 text-sm text-neutral-300">
              Please install MetaMask Flask to continue.
            </p>

            <Button as="a" href="https://metamask.io/flask" target="_blank" rel="noreferrer">
              Install MetaMask Flask
            </Button>
          </div>
        ) : null}

        {snapState.flaskInstalled && !snapState.snapInstalled ? (
          <div className="text-center">
            <h1 className="mb-2 text-xl">ReadOnly snap not installed</h1>
            <p className="mb-12 text-sm text-neutral-300">
              Please install the ReadOnly snap to continue.
            </p>

            <Button onClick={() => installSnap()}>Connect the ReadOnly snap</Button>
          </div>
        ) : null}
      </div>

      {snapState.snapInstalled ? (
        <div className="flex flex-col items-center">
          <div className="mt-10 flex gap-2">
            <Input
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Enter the address"
              className="min-w-96"
            />
            <Button onClick={addAccount}>Add</Button>
          </div>

          <div className="flex w-full flex-col items-center">
            <div className="mt-10 w-full">
              <h1 className="mb-2 text-xl">Your Accounts</h1>

              {Object.values(snapAccounts).map((account) => (
                <div className="relative grid gap-1 p-2">
                  <a
                    href={`https://blockscan.com/address/${account.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center rounded-lg bg-neutral-900 p-2 transition duration-150 ease-in-out hover:bg-neutral-950 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                  >
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white">{account.address}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

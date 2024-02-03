import {KeyringAccount} from '@metamask/keyring-api';

export const AccountCard: React.FC<{account: KeyringAccount}> = ({account}) => {
  return (
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
  );
};

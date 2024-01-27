import {Button, Input} from '../../components';

export const Landing: React.FC = () => {
  return (
    <div className="flex h-dvh flex-1 flex-col items-center px-8 md:px-16">
      <div className="flex flex-col items-center py-14 text-center md:py-28">
        <h1 className="text-4xl">ReadOnly</h1>
        <h2 className="text-xl">View and interact with your accounts directly on MetaMask.</h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="mt-10">
          <Button>Connect your MetaMask</Button>
        </div>

        <div className="mt-10 flex gap-2">
          <Input value="0x1234" placeholder="Enter the address" />
          <Button>Add</Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="mt-10">
          <h1 className="mb-2 text-xl">Your Accounts</h1>

          <div className="relative grid gap-1 p-2">
            <a
              href="https://blockscan.com/address/0x"
              target="_blank"
              rel="noreferrer"
              className="flex items-center rounded-lg bg-neutral-900 p-2 transition duration-150 ease-in-out hover:bg-neutral-950 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
            >
              <div className="ml-4">
                <p className="text-sm font-medium text-white">0x</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import clsx from 'clsx';

export const Input: React.FC<JSX.IntrinsicElements['input']> = ({className, ...props}) => {
  return (
    <input
      type="text"
      className={clsx(
        'border-primary-500 rounded-md border px-4 py-2 outline-none',
        'rounded-md bg-neutral-800 px-4 py-2 text-white',
        'hover:bg-neutral-900 focus:bg-neutral-900',
        'transition-colors',
        className,
      )}
      {...props}
    />
  );
};

import clsx from 'clsx';

export const Button: React.FC<JSX.IntrinsicElements['button']> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'bg-primary-500 rounded-md px-4 py-2 text-white',
        'hover:bg-primary-600',
        'transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

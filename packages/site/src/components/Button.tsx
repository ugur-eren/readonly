import clsx from 'clsx';
import {createAsAble} from '../utils/createAsAble';

export const Button = createAsAble<'button'>(
  'button',
  (AsAble, {children, className, ...props}) => {
    return (
      <AsAble
        type={props.as === 'button' ? 'button' : undefined}
        className={clsx(
          'bg-primary-500 rounded-md px-4 py-2 text-white',
          'hover:bg-primary-600',
          'transition-colors',
          className,
        )}
        {...props}
      >
        {children}
      </AsAble>
    );
  },
);

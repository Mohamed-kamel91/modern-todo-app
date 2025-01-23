import clsx from 'clsx';

import { getStyles } from '@utils/getStyles';
import { cn } from '@utils';

const spinnerVariants = {
  size: {
    sm: 'icon-sm border-[2px]',
    rg: 'icon-rg border-[3px]',
    md: 'icon-md border-[3px]',
    lg: 'icon-lg border-[4px]',
  },
  color: {
    default: 'border-current',
    primary: 'border-black',
    secondary: 'border-white',
  },
};

type spinnerProps = {
  className?: string;
  size?: keyof (typeof spinnerVariants)['size'];
  color?: keyof (typeof spinnerVariants)['color'];
};

export const Spinner = ({
  className = '',
  size = 'md',
  color = 'default',
}: spinnerProps) => {
  const baseStyles =
    'inline-block animate-spin rounded-full border-solid border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]';

  const spinnerStyles = getStyles(baseStyles, spinnerVariants);

  return (
    <div
      className={cn('flex items-center justify-center', className)}
    >
      <div
        className={clsx(spinnerStyles({ color, size }))}
        role="status"
         aria-label="spinner"
      />
    </div>
  );
};

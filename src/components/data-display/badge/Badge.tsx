import { useMemo } from 'react';

import { cn, getStyles } from '@utils';

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'circle' | 'sharp';
  variant?: 'primary' | 'secondary' | 'default';
  active?: boolean;
  children: React.ReactNode;
};

const badgeVariants = {
  base: 'flex justify-center items-center text-[12px] font-medium',
  variants: {
    variant: {
      primary: 'bg-black text-white',
      secondary: 'bg-gray text-black',
      default: 'text-black',
    },
    size: {
      sm: 'min-h-[18px] min-w-[18px] rounded-[3px] px-[5px]',
      md: 'min-h-[22px] min-w-[22px] rounded-[4px] px-[7px]',
      lg: 'min-h-[26px] min-w-[26px] rounded-[5px] px-[9px]',
    },
    shape: {
      sharp: 'rounded-none',
      circle: 'rounded-full',
    },
  },
};

export const Badge = ({
  className,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  active = false,
  children,
  ...props
}: BadgeProps) => {
  const { base, variants } = badgeVariants;

  const badgeStyles = useMemo(() => {
    return getStyles(base, variants);
  }, [base, variants]);

  return (
    <div
      className={cn(
        badgeStyles({
          variant,
          size,
          shape: shape as 'circle' | 'sharp',
        }),
        active && 'active: font-extrabold',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

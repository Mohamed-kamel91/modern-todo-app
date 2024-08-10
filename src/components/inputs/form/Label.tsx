import { cn } from '@utils/cn';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

export const Label = ({
  className = '',
  children,
  ...restProps
}: LabelProps) => {
  return (
    <label
      className={cn('cursor-pointer font-medium', className)}
      {...restProps}
    >
      {children}
    </label>
  );
};

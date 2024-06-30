import { cn } from '@utils/cn';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  children: React.ReactNode;
};

export const Label = ({
  className = '',
  required,
  children,
  ...restProps
}: LabelProps) => {
  return (
    <label 
      className={cn('cursor-pointer', className)} 
      {...restProps}
    >
      {children}  
      {required && <span>*</span>}
    </label>
  );
};

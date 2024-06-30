import { cn } from '@utils/cn';

type FormProps =
  React.FormHTMLAttributes<HTMLFormElement> & {
    children: any;
  };

export const Form = ({
  className,
  id,
  children,
  onSubmit,
  ...restProps
}: FormProps) => {
  return (
    <form
      className={cn(className)}
      id={id}
      noValidate
      onSubmit={onSubmit}
      {...restProps}
    >
      {children}
    </form>
  );
};

import { capitalizeFirst, cn } from '@utils';

type ErrorProps = {
  className?: string;
  errorMessage?: string;
};

export const Error = ({
  className,
  errorMessage,
}: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div
      className={cn(
        'text-[14px] font-medium text-danger',
        className
      )}
      role="alert"
      aria-label={errorMessage}
    >
      {capitalizeFirst(errorMessage)}
    </div>
  );
};

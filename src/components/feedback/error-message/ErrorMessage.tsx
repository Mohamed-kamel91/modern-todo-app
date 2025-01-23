type ErrorMessageProps = {
  message: string;
  action: JSX.Element;
};

export const ErrorMessage = ({
  message,
  action,
}: ErrorMessageProps) => {
  return (
    <div>
      <p role="alert">{message}</p>
      {action && action}
    </div>
  );
};

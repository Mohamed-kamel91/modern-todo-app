import { Button } from '@components/inputs/buttons';

type ErrorFallbackProsp = {
  error?: Error;
  resetErrorBoundary?: (...args: any[]) => void;
};

export const ErrorFallback = ({ error }: ErrorFallbackProsp) => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center "
      role="alert"
    >
      <h2 className="mb-[20px] text-[20px] font-medium">
        {error ? error.message : 'Ooops, something went wrong!'}
      </h2>

      <Button
        variant="primary"
        size="sm"
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    </div>
  );
};

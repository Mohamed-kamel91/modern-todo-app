import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/reactQuery';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@components/feedback';
import { AuthProvider } from '@features/auth/contexts/auth-context';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>

          <ReactQueryDevtools
            initialIsOpen={false}
            position="right"
          />
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

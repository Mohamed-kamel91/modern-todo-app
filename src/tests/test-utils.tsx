import {
  render as rtlRender,
  RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { AppProvider } from '../app/AppProvider';

// Custom render function with AppProvider
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: AppProvider, ...options });

// Initialize QueryClient for hook tests
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for tests to avoid delays
      staleTime: 0, // Ensure data is always considered fresh for tests
    },
  },
});

// QueryClientWrapper for testing hooks
const QueryClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export * from '@testing-library/react';
export { userEvent, customRender as render, QueryClientWrapper };

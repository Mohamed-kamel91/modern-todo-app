import '@testing-library/jest-dom/vitest';

import { server } from './mocks/server';
import { queryClient } from '@lib/reactQuery';

beforeAll(() => {
  // Start the interception.
  server.listen();
});

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers();
  queryClient.clear();
});

afterAll(() => {
  // Disable request interception and clean up.
  server.close();
});

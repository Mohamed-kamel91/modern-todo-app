import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/reactQuery';

import { Todo } from '@features/todo';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
}

export default App;

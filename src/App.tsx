import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/reactQuery';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>dashboard</div>
    </QueryClientProvider>
  );
}

export default App;

import { AppProvider } from '@AppProvider';

import { Todo } from '@features/todo';

function App() {
  return (
    <AppProvider>
      <Todo />
    </AppProvider>
  );
}

export default App;

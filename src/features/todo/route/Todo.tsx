import { MainLayout, Sidebar } from '../layouts';
import { Tasks } from '@features/tasks';

export const Todo = () => {
  return (
    <div className="mx-auto h-[100vh] min-h-[100vh]">
      <div className="flex h-full gap-[30px]">
        <Sidebar />

        <MainLayout>
          <Tasks />
        </MainLayout>
      </div>
    </div>
  );
};

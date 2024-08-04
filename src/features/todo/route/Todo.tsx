import { Outlet } from 'react-router-dom';

import { MainLayout, Sidebar } from '../layouts';

export const Todo = () => {
  return (
    <div className="mx-auto h-[100vh] min-h-[100vh]">
      <div className="flex h-full gap-[30px]">
        <Sidebar />

        <MainLayout>
          <Outlet />
        </MainLayout>
      </div>
    </div>
  );
};

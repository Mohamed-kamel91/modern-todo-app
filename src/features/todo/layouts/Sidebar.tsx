import { TasksMenu, ProfileMenu } from '../components';

export const Sidebar = () => {
  return (
    <aside className="relative flex w-[300px] flex-shrink-0 flex-col overflow-auto bg-gray-light px-[20px]">
      <nav className="flex-grow py-[20px]">
        <TasksMenu />
      </nav>

      <div className="mt-auto">
        <ProfileMenu />
      </div>
    </aside>
  );
};

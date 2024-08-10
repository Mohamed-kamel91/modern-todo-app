import { TasksMenu, ProfileMenu } from '../components';

export const Sidebar = () => {
  return (
    <div className="relative flex w-[300px] flex-shrink-0 flex-col bg-gray-light p-[20px]">
      <nav className="flex-grow">
        <TasksMenu />
      </nav>

      <div className="mt-auto">
        <ProfileMenu />
      </div>
    </div>
  );
};

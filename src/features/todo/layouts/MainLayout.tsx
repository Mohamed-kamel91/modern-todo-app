import { TodoHeader } from './TodoHeader';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative flex flex-grow flex-col overflow-y-scroll">
      <TodoHeader />

      <main className="mt-[20px] flex-grow px-[20px]">
        {children}
      </main>
    </div>
  );
};

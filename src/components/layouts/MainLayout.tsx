import { Link } from 'react-router-dom';

import { Logo } from '@components/media';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative flex flex-grow flex-col overflow-y-auto">
      <header className="sticky top-0 z-50 bg-white px-[20px] py-[20px]">
        <Link to="/">
          <Logo />
        </Link>
      </header>

      <main className="mt-[20px] flex-grow px-[20px]">
        {children}
      </main>
    </div>
  );
};

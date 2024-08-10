import { Link, useLocation } from 'react-router-dom';

import { Head } from '@components/data-display';
import { Logo } from '@components/media';

type AuthLayoutProps = {
  title: string;
  pageTitle: string;
  children: React.ReactNode;
};

const HEAD_DESCRIPTION =
  'Login to manage your tasks or register to get started with our task management platform.';

export const AuthLayout = ({
  title,
  pageTitle,
  children,
}: AuthLayoutProps) => {
  const location = useLocation();
  const redirectTo = location.state;

  const isLogin = title.toLowerCase() === 'log in';

  return (
    <div>
      <Head title={title} description={HEAD_DESCRIPTION} />

      <header>
        <div className="mx-auto max-w-[1400px] p-[20px_50px]">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[500px] p-[50px]">
        <h1 className="mb-[5px]">{pageTitle}</h1>
        <p className="mb-[30px]">
          {isLogin
            ? 'Dont have an account?'
            : 'Have an account?'}{' '}
          <Link
            className="font-bold underline"
            to={`/auth/${isLogin ? 'register' : 'login'}`}
            state={redirectTo}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </Link>
        </p>

        {children}
      </main>
    </div>
  );
};

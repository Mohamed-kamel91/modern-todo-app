import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@features/auth/contexts/auth-context';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({
  children,
}: PrivateRouteProps) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={location.pathname ?? '/'}
        replace
      />
    );
  }

  return children;
};

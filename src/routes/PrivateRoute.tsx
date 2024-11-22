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

  const urlPath = `${location.pathname}${location.search}`;
  
  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={urlPath ?? '/'}
        replace
      />
    );
  }

  return children;
};

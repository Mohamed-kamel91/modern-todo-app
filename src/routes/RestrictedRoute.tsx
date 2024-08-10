import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@features/auth/contexts/auth-context';

type RestrictedRouteProps = {
  children: React.ReactNode;
};

export const RestrictedRoute = ({
  children,
}: RestrictedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to={location.state ?? '/'} replace />;
  }

  return children;
};

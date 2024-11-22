import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@features/auth/contexts/auth-context';

export const RestrictedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (user) {
    return <Navigate to={location.state ?? '/'} replace />;
  }

  return <Outlet />;
};

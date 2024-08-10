import { useLocation, useNavigate } from 'react-router-dom';

import { AuthLayout } from '@components/layouts';
import { LoginForm } from '../components';

import { User } from '../types';
import { useAuth } from '../contexts/auth-context';
import { AxiosResponse } from 'axios';

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { persistUser } = useAuth();

  const onLoginSuccess = (data: AxiosResponse<User[], any>) => {
    persistUser(data.data[0]);
    navigate(location.state ?? '/', { replace: true });
  };

  return (
    <AuthLayout
      title="Log in"
      pageTitle="Login into your account"
    >
      <LoginForm onSuccess={onLoginSuccess} />
    </AuthLayout>
  );
};

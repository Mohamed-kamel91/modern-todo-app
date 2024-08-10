import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { AuthLayout } from '@components/layouts';
import { RegisterForm } from '../components';

import { useAuth } from '../contexts/auth-context';
import { User } from '../types';

export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { persistUser } = useAuth();

  const onRegisterSuccess = (data: AxiosResponse<User, any>) => {
    persistUser(data.data);
    navigate(location.state ?? '/', { replace: true });
  };

  return (
    <AuthLayout title="Sign up" pageTitle="Create your account">
      <RegisterForm onSuccess={onRegisterSuccess} />
    </AuthLayout>
  );
};

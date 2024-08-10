import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

type LogoutProps = {
  children: ({
    handleLogout,
  }: {
    handleLogout: () => void;
  }) => void;
};

export const Logout = ({ children }: LogoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

  return <>{children({ handleLogout })}</>;
};

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { User } from '../types';

// Context
export type AuthContextType = {
  user: User | null;
  logout: (onLogout?: () => void) => void;
  persistUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Context consumer
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'Component must be used within a AuthProvider'
    );
  }

  return context;
};

// Context provider
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          'Authentication failed. Please try again.'
        );
      }
    }
  });

  const persistUser = (user: User) => {
    const userData = JSON.stringify(user);
    localStorage.setItem('user', userData);
    setUser(user);
  };

  const logout = (onLogout?: () => void) => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      onLogout && onLogout();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('Logout failed. Please try again.');
      }
    }
  };

  const value = useMemo(
    () => ({ user, logout, persistUser }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

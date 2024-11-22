import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { Tasks } from '@features/tasks';
import { Todo } from '@features/todo';

export const router = createBrowserRouter([
  {
    element: <RestrictedRoute />,
    children: [
      {
        path: '/auth/register',
        lazy: async () => {
          const { Register } = await import(
            '@features/auth/routes/Register'
          );
          return {
            Component: Register,
          };
        },
      },
      {
        path: '/auth/login',
        lazy: async () => {
          const { Login } = await import(
            '@features/auth/routes/Login'
          );
          return {
            Component: Login,
          };
        },
      },
    ],
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Todo />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/tasks" replace={true} />,
      },
      {
        path: 'tasks',
        Component: Tasks,
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFound } = await import('./NotFound');
      return { Component: NotFound };
    },
  },
]);

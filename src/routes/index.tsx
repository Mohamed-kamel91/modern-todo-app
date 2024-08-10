import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Tasks } from '@features/tasks';
import { Todo } from '@features/todo';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';

export const router = createBrowserRouter([
  {
    path: '/auth/register',
    lazy: async () => {
      const { Register } = await import('@features/auth');
      return {
        element: (
          <RestrictedRoute>
            <Register />
          </RestrictedRoute>
        ),
      };
    },
  },
  {
    path: '/auth/login',
    lazy: async () => {
      const { Login } = await import('@features/auth');
      return {
        element: (
          <RestrictedRoute>
            <Login />
          </RestrictedRoute>
        ),
      };
    },
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
        path: '/tasks',
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

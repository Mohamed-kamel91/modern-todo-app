import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Tasks } from '@features/tasks';
import { Todo } from '@features/todo';

export const router = createBrowserRouter([
  {
    path: '/auth/login',
    lazy: async () => {
      const { Login } = await import('@features/auth/Login');
      return { Component: Login };
    },
  },
  {
    path: '/',
    Component: Todo,
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

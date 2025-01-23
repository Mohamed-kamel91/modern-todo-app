import { randTodo, randUuid } from '@ngneat/falso';

import { User } from '@features/auth/types';
import { Task } from '@features/tasks';

export const generateTask = (): Task => ({
  id: randUuid(),
  userId: randUuid(),
  text: randTodo().title,
  status: 'completed',
  isCompleted: true,
  createdAt: new Date(),
  modifiedAt: new Date(),
});

export const createTask = (
  overrides: Partial<ReturnType<typeof generateTask>> = {}
): Task => ({
  ...generateTask(),
  ...overrides,
});

export const generateTasks = (): Task[] => [
  createTask({ isCompleted: false, status: 'active' }),
  createTask({ isCompleted: true, status: 'completed' }),
];

export const generateUser = (): User => ({
  id: 'df425be7-9ad4-410a-b17e-6a696637e1fc',
  firstName: 'mohamed',
  lastName: 'kamel',
  email: 'mohkamel91@gmail.com',
  createdAt: new Date(),
});

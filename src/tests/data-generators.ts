import { randTodo, randUuid } from '@ngneat/falso';

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

export const generateTasks = (): Task[] => [generateTask()];

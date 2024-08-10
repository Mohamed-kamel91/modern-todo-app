import { v4 as uuidv4 } from 'uuid';

import { Task } from '../types';

export function createNewTask(
  text: string,
  userId: string
): Task {
  return {
    id: uuidv4(),
    userId,
    text,
    isCompleted: false,
    status: "active",
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
}

import { v4 as uuidv4 } from 'uuid';

import { Task } from '../types';

export function createNewTask(text: string): Task {
  return {
    id: uuidv4(),
    text,
    isCompleted: false,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
}

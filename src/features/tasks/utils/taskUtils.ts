import { Task } from '../types';

export const isTextEmpty = (text: string) => text.length === 0;

export const getActiveTasks = (tasks?: Task[]) => {
  
  return tasks?.filter((task) => !task.isCompleted);
};

export const getCompletedTasks = (tasks?: Task[]) => {
  return tasks?.filter((task) => task.isCompleted);
};

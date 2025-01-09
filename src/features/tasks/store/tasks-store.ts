import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Task } from '../types';

export type TasksStore = {
  allTasksCount: number;
  activeTasksCount: number;
  completedTasksCount: number;
  setTasksCounts: (tasks: Task[]) => void;
};

export const useTasksStore = create(
  devtools<TasksStore>((set) => ({
    allTasksCount: 0,
    activeTasksCount: 0,
    completedTasksCount: 0,
    setTasksCounts: (tasks) => {
      set({
        activeTasksCount: tasks.filter((task) => !task.isCompleted)
          .length,
        completedTasksCount: tasks.filter((task) => task.isCompleted)
          .length,
        allTasksCount: tasks.length,
      });
    },
  }))
);

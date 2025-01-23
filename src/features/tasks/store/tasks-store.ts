import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Task } from '../types';

export type TasksStore = {
  allTasksCount: number;
  activeTasksCount: number;
  completedTasksCount: number;
  isActiveTasksEmpty: boolean;
  isCompletedTasksEmpty: boolean;
  setTasksCounts: (tasks: Task[]) => void;
};

export const useTasksStore = create(
  devtools<TasksStore>((set) => ({
    allTasksCount: 0,
    activeTasksCount: 0,
    completedTasksCount: 0,
    isActiveTasksEmpty: true,
    isCompletedTasksEmpty: true,

    setTasksCounts: (tasks) => {
      const activeTasksCount = tasks.filter(
        (task) => !task.isCompleted
      ).length;
      const completedTasksCount = tasks.filter(
        (task) => task.isCompleted
      ).length;

      set({
        activeTasksCount,
        completedTasksCount,
        allTasksCount: tasks.length,
        isActiveTasksEmpty: activeTasksCount === 0,
        isCompletedTasksEmpty: completedTasksCount === 0,
      });
    },
  }))
);

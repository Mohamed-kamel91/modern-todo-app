import { create } from 'zustand';

import { Task, TasksType } from '../types';

type TasksStore = {
  tasksType: TasksType;
  allTasksCount: number;
  activeTasksCount: number;
  completedTasksCount: number;
  setTasksCounts: (tasks: Task[]) => void;
  setTasksType: (type: TasksType) => void;
};

export const useTasksStore = create<TasksStore>((set) => ({
  tasksType: 'all',
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
  setTasksType: (type) => set({ tasksType: type }),
}));

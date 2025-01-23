import { useEffect, useMemo } from 'react';

import { useTasksStore } from '../store/tasks-store';
import { getActiveTasks, getCompletedTasks } from '../utils';
import { Task } from '../types';

type UseTasksData = {
  tasks: Task[] | undefined;
};

export const useTasks = ({ tasks }: UseTasksData) => {
  const {
    activeTasksCount,
    completedTasksCount,
    isActiveTasksEmpty,
    isCompletedTasksEmpty,
    setTasksCounts,
  } = useTasksStore((state) => state);

  const activeTasks = useMemo(
    () => getActiveTasks(tasks),
    [tasks]
  );

  const completedTasks = useMemo(
    () => getCompletedTasks(tasks),
    [tasks]
  );

  // Change tasks count when tasks updated
  useEffect(() => {
    if (tasks) {
      setTasksCounts(tasks);
    }
  }, [tasks]);

  return {
    activeTasks,
    completedTasks,
    activeTasksCount,
    completedTasksCount,
    isActiveTasksEmpty,
    isCompletedTasksEmpty,
  };
};

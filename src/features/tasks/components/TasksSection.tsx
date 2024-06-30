import { ErrorMessage, Spinner } from '@components/feedback';
import { Button } from '@components/inputs/buttons';
import { TasksList } from './TasksList';

import { useGetTasks } from '../api/getTasks';
import { useTasks } from '../hooks';
import {
  EMPTY_ACTIVE_TASKS,
  EMPTY_COMPLETED_TASKS,
} from '../constants';

export const TasksSection = () => {
  // Fetch tasks
  const {
    data: tasks,
    isPending,
    isSuccess,
    isError,
    refetch,
  } = useGetTasks();

  // Tasks hook
  const {
    activeTasks,
    completedTasks,
    tasksType,
    isActiveTasksEmpty,
    isCompletedTasksEmpty,
  } = useTasks({ tasks: tasks?.data, isSuccess });

  if (isPending) {
    return <Spinner size="lg" className="mt-[30px]" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Oops, something went wrong! Please refresh the page."
        action={
          <Button
            size="sm"
            className="mt-[10px]"
            onClick={() => refetch()}
          >
            Try again
          </Button>
        }
      />
    );
  }

  return (
    <div>
      {tasksType === 'all' && (
        <>
          <TasksList
            title="Active"
            tasks={activeTasks}
            isEmpty={isActiveTasksEmpty}
            emptyMessage={EMPTY_ACTIVE_TASKS}
          />

          <TasksList
            title="Completed"
            tasks={completedTasks}
            isEmpty={isCompletedTasksEmpty}
            emptyMessage={EMPTY_COMPLETED_TASKS}
          />
        </>
      )}

      {tasksType === 'active' && (
        <TasksList
          title="Active"
          tasks={activeTasks}
          isEmpty={isActiveTasksEmpty}
          emptyMessage={EMPTY_ACTIVE_TASKS}
        />
      )}

      {tasksType === 'completed' && (
        <TasksList
          title="Completed"
          tasks={completedTasks}
          isEmpty={isCompletedTasksEmpty}
          emptyMessage={EMPTY_COMPLETED_TASKS}
        />
      )}
    </div>
  );
};

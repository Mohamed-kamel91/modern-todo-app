import { useSearchParams } from 'react-router-dom';

import { ErrorMessage, Spinner } from '@components/feedback';
import { Button } from '@components/inputs/buttons';
import { TasksList } from './TasksList';

import { useGetTasks } from '../api/getTasks';
import { useTasks } from '../hooks';
import {
  EMPTY_ACTIVE_TASKS,
  EMPTY_COMPLETED_TASKS,
} from '../constants';

type TasksSectionProps = {
  userId: string;
};

export const TasksSection = ({ userId }: TasksSectionProps) => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  // Fetch tasks
  const {
    data: tasks,
    isPending,
    isError,
    refetch,
  } = useGetTasks({ userId, status });

  // Tasks hook
  const {
    activeTasks,
    completedTasks,
    isActiveTasksEmpty,
    isCompletedTasksEmpty,
  } = useTasks({ tasks: tasks?.data });

  if (isPending) {
    return <Spinner size="lg" className="mt-[30px]" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Oops, something went wrong! Please try again."
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

  // Check if status query param value is valid
  const isValidStatus =
    status === 'active' || status === 'completed';

  return (
    <div>
      {!isValidStatus && (
        <>
          <TasksList
            title="Active"
            tasks={activeTasks}
            status="active"
            isEmpty={isActiveTasksEmpty}
            emptyMessage={EMPTY_ACTIVE_TASKS}
          />

          <TasksList
            title="Completed"
            tasks={completedTasks}
            status="completed"
            isEmpty={isCompletedTasksEmpty}
            emptyMessage={EMPTY_COMPLETED_TASKS}
          />
        </>
      )}

      {status === 'active' && (
        <TasksList
          title="Active"
          tasks={activeTasks}
          status={status}
          isEmpty={isActiveTasksEmpty}
          emptyMessage={EMPTY_ACTIVE_TASKS}
        />
      )}

      {status === 'completed' && (
        <TasksList
          title="Completed"
          tasks={completedTasks}
          status={status}
          isEmpty={isCompletedTasksEmpty}
          emptyMessage={EMPTY_COMPLETED_TASKS}
        />
      )}
    </div>
  );
};

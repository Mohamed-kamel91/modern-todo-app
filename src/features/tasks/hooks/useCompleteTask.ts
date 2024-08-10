import { UpdateTaskMutation } from '../types';

type TaskData = {
  id: string;
  isCompleted: boolean;
};

export const useCompleteTask = (
  { id, isCompleted }: TaskData,
  updateTaskMutation: UpdateTaskMutation
) => {
  const handleCompleteTask = () => {
    updateTaskMutation.mutate({
      taskId: id,
      data: {
        isCompleted: !isCompleted,
        status: isCompleted ? 'active' : 'completed',
      },
    });
  };

  const handleMarkAsActive = () => {
    updateTaskMutation.mutate({
      taskId: id,
      data: {
        isCompleted: false,
        status: 'active',
      },
    });
  };

  const handleMarkAsCompleted = () => {
    updateTaskMutation.mutate({
      taskId: id,
      data: {
        isCompleted: true,
        status: 'completed',
      },
    });
  };

  return {
    handleCompleteTask,
    handleMarkAsActive,
    handleMarkAsCompleted,
  };
};

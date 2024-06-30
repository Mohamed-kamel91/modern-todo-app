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
      },
    });
  };

  const handleMarkAsActive = () => {
    updateTaskMutation.mutate({
      taskId: id,
      data: {
        isCompleted: false,
      },
    });
  };

  const handleMarkAsCompleted = () => {
    updateTaskMutation.mutate({
      taskId: id,
      data: {
        isCompleted: true,
      },
    });
  };

  return {
    handleCompleteTask,
    handleMarkAsActive,
    handleMarkAsCompleted,
  };
};

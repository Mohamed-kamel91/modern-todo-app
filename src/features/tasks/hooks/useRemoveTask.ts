import { DeleteTaskMutation } from '../types';

export const useRemoveTask = (
  id: string,
  deleteTaskMutation: DeleteTaskMutation
) => {
  const handleDeleteTask = () => {
    deleteTaskMutation.mutate({ taskId: id });
  };

  return { handleDeleteTask };
};

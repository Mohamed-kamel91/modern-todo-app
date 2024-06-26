import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { getTasksQueryOptions } from './getTasks';

import { api } from '@lib/axios';
import { MutationConfig } from '@lib/reactQuery';
import { Task } from '../types';

export type DeleteTaskDTO = {
  taskId: string;
};

export const deleteTask = ({
  taskId,
}: DeleteTaskDTO): Promise<AxiosResponse<Task>> => {
  return api.delete(`/tasks/${taskId}`);
};

type UseDeleteTaskParams = {
  mutationConfig?: MutationConfig<typeof deleteTask>;
};

export const useDeleteTask = ({
  mutationConfig,
}: UseDeleteTaskParams = {}) => {
  const queryClient = useQueryClient();
  const { queryKey } = getTasksQueryOptions();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey });

      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

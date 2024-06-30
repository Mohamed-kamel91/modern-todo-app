import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { getTasksQueryOptions } from './getTasks';

import { api } from '@lib/axios';
import { MutationConfig } from '@lib/reactQuery';
import { Task } from '../types';

export type UpdateTaskDTO = {
  taskId: string;
  data: {
    text?: Task['text'];
    isCompleted?: Task['isCompleted'];
  };
};

export const updateTask = ({
  taskId,
  data,
}: UpdateTaskDTO): Promise<AxiosResponse<Task>> => {
  return api.patch(`/tasks/${taskId}`, data);
};

type UseUpdateTaskParams = {
  mutationConfig?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({
  mutationConfig,
}: UseUpdateTaskParams = {}) => {
  const queryClient = useQueryClient();
  const { queryKey } = getTasksQueryOptions();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey });

      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

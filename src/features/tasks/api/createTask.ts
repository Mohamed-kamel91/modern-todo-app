import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { getTasksQueryOptions } from './getTasks';

import { api } from '@lib/axios';
import { MutationConfig } from '@lib/reactQuery';
import { Task } from '../types';

export type createTaskDTO = {
  data: Task;
};

export const createTask = ({
  data,
}: createTaskDTO): Promise<AxiosResponse<Task[]>> => {
  return api.post('/tasks', data);
};

type UseCreateTaskParams = {
  mutationConfig?: MutationConfig<typeof createTask>;
};

export const useCreateTask = ({
  mutationConfig,
}: UseCreateTaskParams = {}) => {
  const queryClient = useQueryClient();
  const { queryKey } = getTasksQueryOptions();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createTask,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey });

      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

import {
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api } from '@lib/axios';
import { MutationConfig } from '@lib/reactQuery';
import { Task } from '../types';

export type createTaskDTO = {
  data: Task;
};

// Axios api
export const createTask = ({
  data,
}: createTaskDTO): Promise<AxiosResponse<Task[]>> => {
  console.log(data);
  
  return api.post('/tasks', data);
};

type UseCreateTaskParams = {
  mutationConfig?: MutationConfig<typeof createTask>;
};

// Query hook
export const useCreateTask = ({
  mutationConfig,
}: UseCreateTaskParams) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createTask,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

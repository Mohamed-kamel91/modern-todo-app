import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api } from '@lib/axios';
import { QueryConfig } from '@lib/reactQuery';
import { Task } from '../types';

type GetTasksDTO = {
  userId: string;
  status?: string | null;
};

// Axios api
export const getTasks = ({
  userId,
  status,
}: GetTasksDTO): Promise<AxiosResponse<Task[]>> => {
  return api.get(`/tasks`, { params: { userId, status } });
};

// Query options
export const getTasksQueryOptions = ({
  userId,
  status,
}: GetTasksDTO) => {
  return queryOptions({
    queryKey: ['tasks'],
    queryFn: () => getTasks({ userId, status }),
  });
};

// Query hook
export const useGetTasks = (
  data: GetTasksDTO,
  queryConfig?: QueryConfig<typeof getTasksQueryOptions>
) => {
  return useQuery({
    ...getTasksQueryOptions({ ...data }),
    ...queryConfig,
  });
};

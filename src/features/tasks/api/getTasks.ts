import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api } from '@lib/axios';
import { QueryConfig } from '@lib/reactQuery';
import { Task } from '../types';

// Axios api
export const getTasks = (
  status?: string | null
): Promise<AxiosResponse<Task[]>> => {
  return api.get('/tasks', { params: { status } });
};

// Query options
export const getTasksQueryOptions = (status?: string | null) => {
  return queryOptions({
    queryKey: ['tasks'],
    queryFn: () => getTasks(status),
  });
};

type UseTasksParams = {
  status?: string | null;
  queryConfig?: QueryConfig<typeof getTasksQueryOptions>;
};

// Query hook
export const useGetTasks = ({
  status,
  queryConfig,
}: UseTasksParams) => {
  return useQuery({
    ...getTasksQueryOptions(status),
    ...queryConfig,
  });
};

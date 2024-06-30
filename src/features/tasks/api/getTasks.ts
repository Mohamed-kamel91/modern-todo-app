import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api } from '@lib/axios';
import { QueryConfig } from '@lib/reactQuery';
import { Task } from '../types';

// Axios api
export const getTasks = (): Promise<AxiosResponse<Task[]>> => {
  return api.get('/tasks');
};

// Query options
export const getTasksQueryOptions = () => {
  return queryOptions({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
};

type UseTasksParams = {
  queryConfig?: QueryConfig<typeof getTasksQueryOptions>;
};

// Query hook
export const useGetTasks = ({ queryConfig }: UseTasksParams = {}) => {
  return useQuery({
    ...getTasksQueryOptions(),
    ...queryConfig,
  });
};

import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api } from '@lib/axios';
import { QueryConfig } from '@lib/reactQuery';
import { LoginInput, User } from '../types';

// Axios api
export const login = (
  data: LoginInput
): Promise<AxiosResponse<User[]>> => {
  const params = Object.entries(data).reduce(
    (params, entry) => ({ ...params, [entry[0]]: entry[1] }),
    {}
  );

  return api.get('/users', { params });
};

// Query options
export const loginQueryOptions = (data: LoginInput) => {
  return queryOptions({
    queryKey: ['user'],
    queryFn: () => login(data),
    enabled: false,
  });
};

type UseLoginParams = {
  data: LoginInput;
  queryConfig?: QueryConfig<typeof loginQueryOptions>;
};

// Query hook
export const useLogin = ({
  data,
  queryConfig,
}: UseLoginParams) => {
  return useQuery({
    ...loginQueryOptions(data),
    ...queryConfig,
  });
};

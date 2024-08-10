import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { api } from '@lib/axios';
import { User } from '../types';
import { MutationConfig } from '@lib/reactQuery';

// Axios api
export const register = (
  data: User
): Promise<AxiosResponse<User>> => {
  return api.post('/users', data);
};

type UseRegisterParams = {
  mutationConfig?: MutationConfig<typeof register>;
};

// Query hook
export const useRegister = ({
  mutationConfig,
}: UseRegisterParams = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: register,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

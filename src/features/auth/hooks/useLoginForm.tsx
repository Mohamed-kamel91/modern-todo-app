import { useState } from 'react';

import { useLogin } from '../api/login';

import { validate } from '@utils/validation';
import { LoginInput, loginSchema, User } from '../types';
import { AxiosResponse } from 'axios';

type UseLoginForm = {
  onSuccess: (data: AxiosResponse<User[], any>) => void;
};

export const useLoginForm = ({ onSuccess }: UseLoginForm) => {
  const [input, setinput] = useState<LoginInput>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<
    Record<keyof LoginInput, string[]>
  > | null>(null);

  const [loginError, setLoginError] = useState<string | null>(
    null
  );

  const login = useLogin({ data: input });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setinput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    // Reset error when field is changed
    if (errors && errors[name as keyof LoginInput]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: [],
      }));
    }
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const validation = validate(input, loginSchema);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    try {
      const { data } = await login.refetch();

      // if users array is empty raise error
      if (!data?.data.length) {
        throw new Error('Wrong email or password !');
      }

      onSuccess(data);
    } catch (e) {
      if (e instanceof Error) {
        setLoginError(e.message);
      }
    }
  };

  return {
    input,
    login,
    errors,
    loginError,
    handleInputChange,
    handleLogin,
  };
};

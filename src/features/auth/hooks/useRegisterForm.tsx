import { useState } from 'react';

import { validate } from '@utils';
import { createUser } from '../utils';
import {
  RegisterInput,
  RegisterMutation,
  registerSchema,
} from '../types';

export const useRegisterForm = (
  registerMutation: RegisterMutation
) => {
  const [input, setinput] = useState<RegisterInput>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<
    Record<keyof RegisterInput, string[]>
  > | null>(null);

  // Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setinput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    // Reset error when field is changed
    if (errors && errors[name as keyof RegisterInput]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: [],
      }));
    }
  };

  // Submit handler
  const handleRegister = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const validation = validate(input, registerSchema);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    // Validated data
    const user = createUser(validation?.data);

    try {
      // Signup mutation
      registerMutation.mutate(user);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('Failed to signup. please try again');
      }
    }
  };

  return {
    input,
    errors,
    handleInputChange,
    handleRegister,
  };
};

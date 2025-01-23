import { useCallback, useEffect, useRef, useState } from 'react';

import { useCreateTask } from '../api/createTask';

import { validate } from '@utils/validation';
import { createNewTask, isTextEmpty } from '../utils';
import { Task, taskSchema } from '../types';

export const useAddTask = (userId: string) => {
  const [text, setText] = useState<string>('');
  const [errors, setErrors] = useState<Partial<
    Record<keyof Task, string[]>
  > | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Add task mutation
  const addTaskMutation = useCreateTask();

  // Input change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (isTextEmpty(value) && errors?.text) {
        clearErrors();
      }

      setText(value);
    },
    [errors]
  );

  // Submit handler
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const task = createNewTask(text, userId);
      const validation = validate(task, taskSchema);
      
      if (validation.success) {
        addTaskMutation.mutate(
          { data: validation.data },
          {
            onSuccess: () => {
              clearInput();
              clearErrors();
              focusInput();
            },
          }
        );
      } else {
        setErrors(validation.error.flatten().fieldErrors);
        focusInput();
      }
    },
    [text, userId]
  );

  const clearInput = () => {
    setText('');
  };

  const clearErrors = () => {
    setErrors(null);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Input focus on first render
  useEffect(() => {
    focusInput();
  }, []);

  return {
    text,
    errors,
    inputRef,
    addTaskMutation,
    handleChange,
    handleSubmit,
  };
};

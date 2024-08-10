import { useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCreateTask } from '../api/createTask';

import { validate } from '@utils/validation';
import { createNewTask, isTextEmpty } from '../utils';
import { Task, taskSchema } from '../types';

export const useAddTask = (userId: string) => {
  const [text, setText] = useState<string>('');
  const [errors, setErrors] = useState<Partial<
    Record<keyof Task, string[]>
  > | null>(null);

  const taskInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Add task mutation
  const createTaskMutation = useCreateTask({
    mutationConfig: {
      onSuccess: () => {
        resetForm();
        focusTaskInput();
      },
    },
  });

  // Task input change handler
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (isTextEmpty(value) && errors?.text) {
        resetErrors();
      }

      setText(value);
    },
    [errors]
  );

  // Task submit handler
  const handleSubmitTask = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!userId) {
        navigate('/auth/login', {
          state: `${location.pathname}${location.search}`,
        });
        return;
      }

      const task = createNewTask(text, userId);
      console.log(task);
      
      const result = validate(task, taskSchema);
      console.log(result.data);
      
      if (result.success) {
        createTaskMutation.mutate({ data: result.data });
      } else {
        setErrors(result.error.flatten().fieldErrors);
      }
    },
    [text, userId]
  );

  const focusTaskInput = () => {
    const input = taskInputRef.current;

    if (input) {
      input.focus();
    }
  };

  const resetForm = () => {
    resetText();
    resetErrors();
  };

  const resetText = () => {
    setText('');
  };

  const resetErrors = () => {
    setErrors(null);
  };

  return {
    text,
    errors,
    taskInputRef,
    createTaskMutation,
    handleTextChange,
    handleSubmitTask,
  };
};

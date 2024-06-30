import { useCallback, useRef, useState } from 'react';

import { validate } from '@utils/validation';
import { useCreateTask } from '../api/createTask';
import { createNewTask, isTextEmpty } from '../utils';
import { Task, taskSchema } from '../types';

export const useAddTask = () => {
  const [text, setText] = useState<string>('');
  const [errors, setErrors] = useState<Partial<
    Record<keyof Task, string[]>
  > | null>(null);

  const taskInputRef = useRef<HTMLInputElement>(null);

  const createTaskMutation = useCreateTask({
    mutationConfig: {
      onSuccess: () => resetForm(),
      // onError: displayNotification()
    },
  });

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

  const handleSubmitTask = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const task = createNewTask(text);
      const result = validate(task, taskSchema);

      if (result.success) {
        createTaskMutation.mutate({ data: result.data });
      } else {
        setErrors(result.error.flatten().fieldErrors);
      }

      focusTaskInput();
    },
    [text]
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

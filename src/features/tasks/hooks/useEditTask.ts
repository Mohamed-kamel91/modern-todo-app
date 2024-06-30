import { useEffect, useRef, useState } from 'react';

import { capitalizeFirst, formatText } from '@utils';
import { isTextEmpty } from '../utils';
import { UpdateTaskMutation } from '../types';

type TaskData = {
  id: string;
  text: string;
};

export const useEditTask = (
  { id, text }: TaskData,
  updateTaskMutation: UpdateTaskMutation
) => {
  const [textInputVal, setTextInputVal] = useState(
    capitalizeFirst(text)
  );
  const [isEditing, setIsEditing] = useState(false);

  const inputTextRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setTextInputVal(value);
  };

  const updateTask = () => {
    updateTaskMutation.mutate({
      taskId: id,
      data: {
        text: formatText(textInputVal),
      },
    });
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleTextBlur = () => {
    const formattedText = formatText(textInputVal);

    setIsEditing(false);

    if (isTextEmpty(formattedText)) {
      setTextInputVal(capitalizeFirst(text));
      return;
    }

    if (text !== formattedText) {
      updateTask();
    }
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextBlur();
    }
  };

  // Set cursor to end of the text
  useEffect(() => {
    if (isEditing) {
      const inputEl = inputTextRef.current;

      if (inputEl) {
        const inputElLength = inputEl.value.length;
        inputEl.setSelectionRange(inputElLength, inputElLength);
        inputEl.focus();
      }
    }
  }, [isEditing]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      setTextInputVal(
        capitalizeFirst(updateTaskMutation.data.data.text)
      );
    }
  }, [updateTaskMutation.data]);

  return {
    textInputVal,
    isEditing,
    inputTextRef,
    handleTextChange,
    handleEditTask,
    handleTextBlur,
    handleKeydown,
  };
};

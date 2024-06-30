import { Form, Input } from '@components/inputs/form';
import { Button } from '@components/inputs/buttons';

import { useAddTask } from '../hooks';
import { isTextEmpty } from '../utils';

import PlusIcon from '../../../assets/icons/plus.svg?react';

export const AddTask = () => {
  const {
    text,
    errors,
    taskInputRef,
    createTaskMutation,
    handleSubmitTask,
    handleTextChange,
  } = useAddTask();

  return (
    <Form id="add-task-form" onSubmit={handleSubmitTask}>
      {errors?.text && (
        <div className="mb-[5px] text-[14px] font-medium text-danger">
          {errors?.text}
        </div>
      )}

      <div className="relative flex rounded-[10px] border border-black-light">
        <Input
          ref={taskInputRef}
          id="add-task-input"
          type="text"
          name="addTask"
          value={text}
          placeholder="What is your next task?"
          autoComplete="off"
          isInvalid={!!errors?.text}
          minLength={0}
          maxLength={70}
          aria-label="What is your next task?"
          onChange={handleTextChange}
        />

        <Button
          className="my-[-1px] ml-0 mr-[-1px] rounded-bl-none rounded-tl-none"
          type="submit"
          variant="primary"
          icon={<PlusIcon className="icon-rg stroke-2" />}
          isLoading={createTaskMutation.isPending}
          disabled={isTextEmpty(text) || createTaskMutation.isPending}
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

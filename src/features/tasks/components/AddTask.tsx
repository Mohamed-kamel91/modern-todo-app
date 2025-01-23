import { Form, Input, Error } from '@components/inputs/form';
import { Button } from '@components/inputs/buttons';

import { useAddTask } from '../hooks';
import { isTextEmpty } from '../utils';

import PlusIcon from '../../../assets/icons/plus.svg?react';

type AddTaskProps = {
  userId: string;
};

export const AddTask = ({ userId }: AddTaskProps) => {
  const {
    text,
    errors,
    inputRef,
    addTaskMutation,
    handleChange,
    handleSubmit,
  } = useAddTask(userId);

  return (
    <Form id="add-task-form" onSubmit={handleSubmit}>
      <Error
        className="mb-[5px]"
        errorMessage={errors?.text?.[0]}
      />

      <div className="relative flex rounded-[10px] border border-black-light">
        <Input
          className="shadow-none focus:shadow-none"
          ref={inputRef}
          id="add-task-input"
          type="text"
          name="addTask"
          value={text}
          placeholder="What is your next task?"
          autoComplete="off"
          autoFocus
          isInvalid={!!errors?.text?.[0]}
          minLength={0}
          maxLength={70}
          aria-label="What is your next task?"
          onChange={handleChange}
        />

        <Button
          className="my-[-1px] ml-0 mr-[-1px] rounded-bl-none rounded-tl-none"
          type="submit"
          variant="primary"
          icon={<PlusIcon className="icon-rg stroke-2" />}
          isLoading={addTaskMutation.isPending}
          disabled={
            isTextEmpty(text) || addTaskMutation.isPending
          }
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

import clsx from 'clsx';

import { Input, Label } from '@components/inputs/form';
import { CopyTask } from './CopyTask';
import { TaskActions } from './TaskActions';

import { useUpdateTask } from '../api/updateTask';
import { useDeleteTask } from '../api/deleteTask';
import {
  useEditTask,
  useCompleteTask,
  useRemoveTask,
} from '../hooks';
import { Task } from '../types';

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const { id, text, isCompleted } = task;

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const {
    textInputVal,
    isEditing,
    inputTextRef,
    handleEditTask,
    handleTextChange,
    handleTextBlur,
    handleKeydown,
  } = useEditTask({ id, text }, updateTaskMutation);

  const {
    handleCompleteTask,
    handleMarkAsActive,
    handleMarkAsCompleted,
  } = useCompleteTask({ id, isCompleted }, updateTaskMutation);

  const { handleDeleteTask } = useRemoveTask(id, deleteTaskMutation);

  return (
    <li className="relative mb-[10px] cursor-pointer rounded-[10px] bg-gray-light transition-colors duration-100 ease-in ">
      <div className="flex py-[4px]">
        <div className="flex flex-grow items-center">
          <Label className="ml-[14px] flex items-center">
            <Input
              type="checkbox"
              name="isCompleted"
              checked={isCompleted}
              disabled={updateTaskMutation.isPending}
              onChange={handleCompleteTask}
            />
          </Label>
          <Label className="flex-grow select-none">
            <Input
              ref={inputTextRef}
              className={clsx(
                'font-medium',
                isCompleted && 'line-through'
              )}
              type="text"
              name="text"
              value={textInputVal}
              disabled={!isEditing}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              onKeyDown={handleKeydown}
            />
          </Label>
        </div>

        <div className="flex items-center px-[14px]">
          <CopyTask taskText={text} />

          <TaskActions
            taskId={id}
            isTaskCompleted={isCompleted}
            handleEditTask={handleEditTask}
            handleMarkAsActive={handleMarkAsActive}
            handleMarkAsCompleted={handleMarkAsCompleted}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </li>
  );
};

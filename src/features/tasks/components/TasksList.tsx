import React from 'react';

import { EmptyTasks } from './EmptyTasks';
import { TaskItem } from './TaskItem';

import { Task } from '../types';

type TasksListProps = {
  title: string;
  tasks: Task[] | undefined;
  status: 'active' | 'completed';
  isEmpty: boolean;
  emptyMessage: string;
};

export const TasksList = React.memo(
  ({
    title,
    tasks,
    status,
    isEmpty,
    emptyMessage,
  }: TasksListProps) => {
    return (
      <>
        <h2
          id={`${status}-tasks`}
          className="text-[18px] font-bold"
        >
          {title}
        </h2>

        {isEmpty ? (
          <EmptyTasks message={emptyMessage} />
        ) : (
          <ul
            className="mb-[40px] mt-[20px]"
            aria-labelledby={`${status}-tasks`}
          >
            {tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        )}
      </>
    );
  }
);

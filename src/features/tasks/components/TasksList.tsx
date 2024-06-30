import { EmptyTasks } from './EmptyTasks';
import { TaskItem } from './TaskItem';

import { Task } from '../types';

type TasksListProps = {
  title: string;
  tasks: Task[] | undefined;
  isEmpty: boolean;
  emptyMessage: string;
};

export const TasksList = ({
  title,
  tasks,
  isEmpty,
  emptyMessage,
}: TasksListProps) => {
  return (
    <>
      <h2 className="text-[18px] font-bold">{title}</h2>
      {isEmpty ? (
        <EmptyTasks message={emptyMessage} />
      ) : (
        <ul className="mb-[40px] mt-[20px]">
          {tasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </>
  );
};

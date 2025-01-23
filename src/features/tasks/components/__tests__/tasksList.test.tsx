import { screen, render } from '@tests/test-utils';
import { createTask } from '@tests/data-generators';

import { TasksList } from '../TasksList';
import { EMPTY_COMPLETED_TASKS } from '@features/tasks/constants';
import { Task } from '@features/tasks/types';

describe('TasksList', () => {
  const tasks: Task[] = Array.from({ length: 2 }, () =>
    createTask({ isCompleted: true, status: 'completed' })
  );

  it('should render completed tasks list', () => {
    render(
      <TasksList
        title="Completed"
        tasks={tasks}
        status="completed"
        isEmpty={false}
        emptyMessage={EMPTY_COMPLETED_TASKS}
      />
    );

    const tasksList = screen.getByRole('list', {
      name: 'Completed',
    });

    expect(
      screen.getByRole('heading', { level: 2 })
    ).toBeInTheDocument();
    expect(tasksList).toBeInTheDocument();
    expect(tasksList.children).toHaveLength(tasks.length);
    expect(
      screen.queryByRole('paragraph', {
        name: EMPTY_COMPLETED_TASKS,
      })
    ).not.toBeInTheDocument();
  });

  it('should render empty tasks message', () => {
    render(
      <TasksList
        title="Completed"
        tasks={[]}
        status="completed"
        isEmpty
        emptyMessage={EMPTY_COMPLETED_TASKS}
      />
    );

    expect(
      screen.getByText(EMPTY_COMPLETED_TASKS)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('list', { name: 'Completed' })
    ).not.toBeInTheDocument();
  });
});

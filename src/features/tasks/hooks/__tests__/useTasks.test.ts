import { renderHook } from '@tests/test-utils';
import { createTask } from '@tests/data-generators';

import { useTasks } from '../useTasks';
import { Task, useTasksStore } from '@features/tasks';

const mockTasks: Task[] = [
  createTask({ isCompleted: false, status: 'active' }),
  createTask({ isCompleted: true, status: 'completed' }),
  createTask({ isCompleted: true, status: 'completed' }),
];

const mockActiveTasks = mockTasks.filter(
  (task) => !task.isCompleted
);

const mockCompletedTasks = mockTasks.filter(
  (task) => task.isCompleted
);

const emptyTasks: Task[] = [];

// Tasks store initial state
const initialState = useTasksStore.getState();

beforeEach(() => {
  useTasksStore.setState(initialState);
});

describe('useTasks', () => {
  it('should return correct tasks count on initial render', () => {
    const { result } = renderHook(() =>
      useTasks({ tasks: mockTasks })
    );

    expect(result.current.activeTasksCount).toBe(
      mockActiveTasks.length
    );
    expect(result.current.completedTasksCount).toBe(
      mockCompletedTasks.length
    );
    expect(result.current.isActiveTasksEmpty).toBe(false);
    expect(result.current.isCompletedTasksEmpty).toBe(false);
  });

  it('should change tasks count when tasks prop changes', () => {
    const { result, rerender } = renderHook(
      (props) => useTasks(props),
      {
        initialProps: { tasks: mockTasks },
      }
    );

    // Change tasks to include active tasks only
    rerender({ tasks: mockActiveTasks });

    expect(result.current.activeTasksCount).toBe(
      mockActiveTasks.length
    );
    expect(result.current.completedTasksCount).toBe(0);
    expect(result.current.isActiveTasksEmpty).toBe(false);
    expect(result.current.isCompletedTasksEmpty).toBe(true);

    // Change tasks to include completed tasks only
    rerender({ tasks: mockCompletedTasks });

    expect(result.current.activeTasksCount).toBe(0);
    expect(result.current.completedTasksCount).toBe(
      mockCompletedTasks.length
    );
    expect(result.current.isActiveTasksEmpty).toBe(true);
    expect(result.current.isCompletedTasksEmpty).toBe(false);
  });

  it('should handle an empty tasks array correctly', () => {
    const { result } = renderHook(() =>
      useTasks({ tasks: emptyTasks })
    );

    expect(result.current.activeTasks).toEqual([]);
    expect(result.current.completedTasks).toEqual([]);
    expect(result.current.activeTasksCount).toBe(0);
    expect(result.current.completedTasksCount).toBe(0);
    expect(result.current.isActiveTasksEmpty).toBe(true);
    expect(result.current.isCompletedTasksEmpty).toBe(true);
  });
});

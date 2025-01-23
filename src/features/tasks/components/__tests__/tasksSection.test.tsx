import { Mock } from 'vitest';
import { delay, http, HttpResponse } from 'msw';
import { useSearchParams } from 'react-router-dom';

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@tests/test-utils';
import { generateUser } from '@tests/data-generators';
import { server } from '@tests/mocks/server';

import { TasksSection } from '../TasksSection';

// Mock useSearchParams
vi.mock('react-router-dom', async () => {
  const reactRouterDom = await vi.importActual<
    typeof import('react-router-dom')
  >('react-router-dom');
  return {
    ...reactRouterDom,
    useSearchParams: vi.fn(),
  };
});

const renderTasksSection = async (params = '') => {
  const userId = generateUser()['id'];

  (useSearchParams as Mock).mockReturnValue([
    new URLSearchParams(params),
  ]);

  render(<TasksSection userId={userId} />);
  const spinner = await screen.findByRole('status', {
    name: 'spinner',
  });

  await waitForElementToBeRemoved(spinner);
};

describe('TasksSection', () => {
  beforeEach(() => {
    (useSearchParams as Mock).mockReset();
  });

  it('should render active task list when ?status=active', async () => {
    await renderTasksSection('status=active');

    const listTitle = await screen.findByRole('heading', {
      level: 2,
    });
    const ActiveTaskList = await screen.findByRole('list', {
      name: 'Active',
    });
    const completedTasklist = screen.queryByRole('list', {
      name: 'Completed',
    });

    expect(listTitle).toHaveTextContent('Active');
    expect(ActiveTaskList).toBeInTheDocument();
    expect(completedTasklist).not.toBeInTheDocument();
  });

  it('should render completed task list when ?status=completed', async () => {
    await renderTasksSection('status=completed');

    const listTitle = await screen.findByRole('heading', {
      level: 2,
    });
    const ActiveTaskList = screen.queryByRole('list', {
      name: 'Active',
    });
    const completedTasklist = await screen.findByRole('list', {
      name: 'Completed',
    });

    expect(listTitle).toHaveTextContent('Completed');
    expect(ActiveTaskList).not.toBeInTheDocument();
    expect(completedTasklist).toBeInTheDocument();
  });

  it('should render both active and completed task lists when search param status doest exist or not valid', async () => {
    await renderTasksSection('status=asd');

    const [activeTitle, completedTitle] =
      await screen.findAllByRole('heading', { level: 2 });
    const ActiveTaskList = await screen.findByRole('list', {
      name: 'Active',
    });
    const completedTasklist = await screen.findByRole('list', {
      name: 'Completed',
    });

    expect(activeTitle).toHaveTextContent('Active');
    expect(completedTitle).toHaveTextContent('Completed');
    expect(ActiveTaskList).toBeInTheDocument();
    expect(completedTasklist).toBeInTheDocument();
  });

  it('should render no tasks message if tasks is empty', async () => {
    server.use(
      http.get(
        `${import.meta.env.VITE_API_URL}/tasks`,
        async () => {
          await delay(50);
          return HttpResponse.json([]);
        }
      )
    );

    await renderTasksSection();

    const [activeTitle, completedTitle] =
      await screen.findAllByRole('heading', { level: 2 });

    expect(activeTitle).toHaveTextContent('Active');
    expect(completedTitle).toHaveTextContent('Completed');
    expect(
      await screen.findByText(
        /No tasks in progress. What's next on your agenda?/
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Your completed tasks list is empty. Time to start checking things off!/
      )
    ).toBeInTheDocument();
  });

  it('should show error message when fetching tasks fails', async () => {
    server.use(
      http.get(
        `${import.meta.env.VITE_API_URL}/tasks`,
        async () => {
          await delay(50);
          return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
          );
        }
      )
    );

    await renderTasksSection();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /Oops, something went wrong! Please try again./
    );

    expect(
      await screen.findByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });
});

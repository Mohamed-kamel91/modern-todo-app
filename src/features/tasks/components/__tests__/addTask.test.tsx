import {
  render,
  userEvent,
  screen,
  waitForElementToBeRemoved,
} from '@tests/test-utils';
import { generateUser } from '@tests/data-generators';

import { AddTask } from '../AddTask';

describe('AddTask', () => {
  const userId = generateUser()['id'];

  it('should render add task component and input is focused on', () => {
    render(<AddTask userId={userId} />);

    const addTaskInput = screen.getByRole('textbox', {
      name: 'What is your next task?',
    });
    const addTaskButton = screen.getByRole('button', {
      name: 'Add',
    });
    const addTaskError = screen.queryByRole('alert');

    expect(addTaskInput).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();
    expect(addTaskError).not.toBeInTheDocument();

    expect(addTaskInput).toHaveFocus();
    expect(addTaskButton).toBeDisabled();
  });

  it('should clear and focus back on add task input after adding task successfully', async () => {
    const user = userEvent.setup();

    render(<AddTask userId={userId} />);

    const addTaskInput = screen.getByRole('textbox', {
      name: 'What is your next task?',
    }) as HTMLInputElement;

    const addTaskButton = screen.getByRole('button', {
      name: 'Add',
    });

    await user.type(addTaskInput, 'go to gym');

    expect(addTaskInput.value).toBe('go to gym');
    expect(addTaskButton).not.toBeDisabled();

    await user.click(addTaskButton);

    expect(
      await screen.findByRole('status')
    ).toBeInTheDocument();

    // This halts test until the queried element is removed
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('status')
    );

    expect(addTaskInput.value).toBe('');
    expect(addTaskInput).toHaveFocus();
    expect(addTaskButton).toBeDisabled();
  });

  it('should show error if task is less than 5 characters on submit', async () => {
    const user = userEvent.setup();

    render(<AddTask userId={userId} />);

    const addTaskInput = screen.getByRole('textbox', {
      name: 'What is your next task?',
    }) as HTMLInputElement;

    const addTaskButton = screen.getByRole('button', {
      name: 'Add',
    });

    await user.type(addTaskInput, 'task');
    await user.click(addTaskButton);

    const inputError = screen.getByRole('alert');

    expect(inputError).toBeInTheDocument();
    expect(inputError).toHaveTextContent(
      /task must be at least 5 characters/i
    );

    await user.clear(addTaskInput);

    expect(inputError).not.toBeInTheDocument();
    expect(addTaskButton).toBeDisabled();
  });
});

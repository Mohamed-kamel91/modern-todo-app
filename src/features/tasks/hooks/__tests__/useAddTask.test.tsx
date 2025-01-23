import { ZodError } from 'zod';

import {
  act,
  QueryClientWrapper,
  renderHook,
  waitFor,
} from '@tests/test-utils';
import { generateUser } from '@tests/data-generators';

import { useAddTask } from '../useAddTask';
import * as validation from '@utils/validation';

describe('useAddTask', () => {
  const userId = generateUser()['id'];

  beforeEach(() => {
    vi.spyOn(validation, 'validate');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAddTask(userId), {
      wrapper: QueryClientWrapper,
    });

    expect(result.current.text).toBe('');
    expect(result.current.errors).toBeNull();
    expect(result.current.inputRef.current).toBeNull();
  });

  it('should update text state when the input changes', () => {
    const { result } = renderHook(() => useAddTask(userId), {
      wrapper: QueryClientWrapper,
    });

    act(() =>
      result.current.handleChange({
        target: { value: 'New task' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.text).toBe('New task');
    expect(result.current.errors).toBeNull();
  });

  it('should set errors state if text is empty', async () => {
    vi.spyOn(validation, 'validate').mockReturnValueOnce({
      success: false,
      error: new ZodError([
        {
          code: 'custom',
          message: 'Text is required',
          path: ['text'],
        },
      ]),
    });

    const { result } = renderHook(() => useAddTask(userId), {
      wrapper: QueryClientWrapper,
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.errors).toEqual({
      text: ['Text is required'],
    });
  });

  it('should clear input and errors on successful task creation', async () => {
    vi.spyOn(validation, 'validate').mockReturnValueOnce({
      success: false,
      error: new ZodError([
        {
          code: 'custom',
          message: 'Text is required',
          path: ['text'],
        },
      ]),
    });

    const { result } = renderHook(() => useAddTask(userId), {
      wrapper: QueryClientWrapper,
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.errors).toEqual({
      text: ['Text is required'],
    });

    act(() =>
      result.current.handleChange({
        target: { value: 'New task' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    await waitFor(() => expect(result.current.text).toBe(''));
    expect(result.current.errors).toBeNull();
  });
});

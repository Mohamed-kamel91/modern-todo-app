import {
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { z } from 'zod';

import { UpdateTaskDTO } from '../api/updateTask';
import { DeleteTaskDTO } from '../api/deleteTask';

export const taskSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  text: z
    .string()
    .trim()
    .min(5, { message: 'Task must be at least 5 characters' })
    .max(70, { message: 'Task must be 70 or fewer characters' }), 
  isCompleted: z.boolean(),
  status: z.union([
    z.literal('all'),
    z.literal('active'),
    z.literal('completed'),
  ]),
  createdAt: z.date(),
  modifiedAt: z.date(),
});

export type Task = z.infer<typeof taskSchema>;

// export type Task = z.infer<typeof taskSchema> & {
//   userId: string;
// };

export type GetTaskQuery = UseQueryResult<
  AxiosResponse<Task[], any>,
  Error
>;

export type TaskMutation<Data, Variables> = UseMutationResult<
  AxiosResponse<Data, any>,
  Error,
  Variables,
  unknown
>;

export type UpdateTaskMutation = TaskMutation<
  Task,
  UpdateTaskDTO
>;
export type DeleteTaskMutation = TaskMutation<
  Task,
  DeleteTaskDTO
>;

export type TaskStatus = 'all' | 'active' | 'completed';

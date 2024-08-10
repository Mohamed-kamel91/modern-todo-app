import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required' })
    .min(3, {
      message: 'First name must be at least 3 characters',
    }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required' })
    .min(3, {
      message: 'Last name must be at least 3 characters',
    }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type BaseEntity = {
  id: string;
  createdAt: number;
};

// export type Entity<T> = {
//   [K in keyof T]: T[K];
// } & BaseEntity;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

export type AuthMutation<Data, Variables> = UseMutationResult<
  AxiosResponse<Data, any>,
  Error,
  Variables,
  unknown
>;

export type RegisterMutation = AuthMutation<User, User>;
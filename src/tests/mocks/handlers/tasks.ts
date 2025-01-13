import { http, HttpResponse as res, delay } from 'msw';

import {
  generateTask,
  generateTasks,
} from '@tests/data-generators';
import { Task } from '@features/tasks';

const env = import.meta.env;

export const taskHandlers = [
  // Get tasks
  http.get(`${env.VITE_API_URL}/tasks`, async ({ request }) => {
    await delay(1000);

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return res.json(
        { error: 'User ID is required!' },
        { status: 400 }
      );
    }

    res.json(generateTasks());
  }),

  // Create task
  http.post(`${env.VITE_API_URL}/tasks`, async ({ request }) => {
    await delay(1000);
    const data = (await request.json()) as Task;
    res.json(data);
  }),

  // Update task
  http.patch(
    `${env.VITE_API_URL}/tasks/:taskId`,
    async ({ request }) => {
      await delay(1000);
      const data = (await request.json()) as Partial<
        ReturnType<typeof generateTask>
      >;
      res.json({ ...generateTask(), ...data });
    }
  ),

  // Delete task
  http.delete(
    `${env.VITE_API_URL}/tasks/:taskId`,
    async ({ params }) => {
      await delay(1000);
      const taskId = params.taskId as string;
      res.json({ ...generateTask(), id: taskId });
    }
  ),
];

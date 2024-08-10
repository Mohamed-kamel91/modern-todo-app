import { v4 as uuidv4 } from 'uuid';

import { RegisterInput, User } from '../types';

export function createUser(input: RegisterInput): User {
  return {
    ...input,
    id: uuidv4(),
    createdAt: new Date(),
  };
}

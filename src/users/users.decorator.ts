import { SetMetadata } from '@nestjs/common';

export const Users = (...args: string[]) => SetMetadata('users', args);

export interface User {
  name: string;
  age: number;
  email: string;
  role: 'INTERN' | 'EMPLOYEE';
}

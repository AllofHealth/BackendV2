import { Types } from 'mongoose';

export type Role = 'INTERN' | 'EMPLOYEE';
export enum Roles {
  intern = 'INTERN',
  employee = 'EMPLOYEE',
}

export interface FindUserInterface {
  id?: Types.ObjectId;

  role: Role;
}

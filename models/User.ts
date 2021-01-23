export class User {
  public id?: string;

  public email?: string;

  public name?: string;

  public password?: string;

  public confirm_password?: string;

  public avatar?: string;
}

export interface UserCreatePayload {
  email?: string;
  name?: string;
  password?: string;
  confirm_password?: string;
  status?: string;
}

export interface UserUpdatePayload {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  active?: string;
}

export type UserDeleteManyPayload = {
  users?: string[];
}

export type UserAddPayload = {
  user?: string;
}

export type UserRoleItem = {
  name: string;
  description: string;
}

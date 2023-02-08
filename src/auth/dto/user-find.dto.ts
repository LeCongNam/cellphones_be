import { Optional } from '@nestjs/common';

export class UserFind {
  id?: string;

  username?: string;

  email?: string;

  password?: string;

  role?: number;
}

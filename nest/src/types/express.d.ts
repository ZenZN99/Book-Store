import type { Request } from 'express';
import { IUser } from 'src/models/User';

export interface RequestWithUser extends Request {
  user: IUser;
}

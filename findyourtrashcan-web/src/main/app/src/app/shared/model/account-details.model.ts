import { User } from './user.model';

export class AccountDetails {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public avatar?: string,
    public birthday?: Date,
    public user: User = {
      role: {}
    }
  ) {}
}

import { User, POSTUser } from './user';

export class AccountDetails {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public avatar?: string,
    public birthday?: Date,
    public user: User = {
      role: {}
    }
  ) { }
}

export class POSTAccountDetails {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public avatar?: string,
    public birthday?: Date,
    public user: POSTUser = new POSTUser()
  ) {
    user.role.id = 1;
  }
}
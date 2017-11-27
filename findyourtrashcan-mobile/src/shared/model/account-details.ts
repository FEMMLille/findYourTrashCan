import { RankType } from './rank_type';
import { Rank } from './rank';
import { User } from './user';
export class AccountDetails {
    constructor(public id?: number,
      public firstName?: string,
      public lastName?: string,
      public email?: string,
      public photoUrl?: string,
      public birthDate?: string,
      public rank?: Rank,
      public rankType?: RankType) {

    }
}

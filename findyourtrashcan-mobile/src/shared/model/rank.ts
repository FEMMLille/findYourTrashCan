import { RangType } from './rank-type';
import { User } from './user';
export class Rang {
    constructor(public id?: number,
        public user?: User,
        public rangType?: RangType,
        public totalPoint?: number) {
    }
}
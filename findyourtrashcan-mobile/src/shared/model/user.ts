import { AccountDetails } from './account-details';
export class User {
    constructor(public id?: number,
        public email?: string,
        public username?: string,
        public account?: AccountDetails) {
    }
}
//TODO add Rang and Rang_type, maybe not in user
import { Role } from './role';
import { Trashcan } from './trashcan';
export class User {
    constructor(
        public id?: number,
        public email?: string,
        public username?: string,
        public password?: string,
        public favoriteSearch?: Trashcan,
        public role: Role = {}
    ) {
        role.id = 1;
    }
}

export class POSTUser {
    constructor(
        public email?: string,
        public username?: string,
        public password?: string,
        public role: Role = {}
    ) {
        role.id = 1;
    }
}

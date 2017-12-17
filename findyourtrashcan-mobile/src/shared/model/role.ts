export class Role {
    constructor(
        public id?: number,
        public roleName?: string,
        public enabled?: boolean
    ) { }
}

export class POSTRole {
    constructor(
        public roleName?: string,
        public enabled?: boolean
    ) { }
}

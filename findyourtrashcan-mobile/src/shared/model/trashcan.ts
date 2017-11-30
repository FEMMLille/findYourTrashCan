import { Point } from './point';
export class Trashcan {
    constructor(public id?: number,
        public refYype?: number,
        public refGarbage?: number,
        public isEmpty?: boolean,
        public coordinates?: Point,
        public picture?: string,
        public refLocation?: number) {
    }
}
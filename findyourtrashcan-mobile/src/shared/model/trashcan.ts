import { Location } from './location';
import { TrashcanType } from './trashcan-type';
import { GarbageType } from './garbage-type';
export class Trashcan {
    constructor(public id?: number,
        public trashcanType?: TrashcanType,
        public garbageType?: GarbageType,
        public empty?: boolean,
        public trustworthy?: boolean,
        public lat?: number,
        public lon?: number,
        public picture?: string,
        public location?: Location) {
    }
}
import { Point } from './point';
export class MapBounds {
    constructor(public northEast?: Point,
        public southWest?: Point) {
    }
}
export interface IColor {
    red: number;
    green: number;
    blue: number;
}

export class Color implements IColor {
    red: number;
    green: number;
    blue: number;

    constructor(r: number, g: number, b: number) {
        this.red = !r || r < 0 || r > 255 ? 0 : r;
        this.green = !g || g < 0 || g > 255 ? 0 : g;
        this.blue = !b || b < 0 || b > 255 ? 0 : b;
    }
}

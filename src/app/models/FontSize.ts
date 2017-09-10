
export class FontSize {
    unit: string;
    max: number;
    min: number;
    value: number;

    constructor(unit: string, max: number, min: number, value?: number) {
        this.unit = unit;
        this.max = !max || max < 1 ? 1 : max;
        this.min = !min || min < 1 ? 1 : min;
        this.value = !value || value < 1 ? 1 : value;
    }

    isSameUnit(size: FontSize): boolean {
        if (!size) {
            return false;
        }
        return this.unit === size.unit;
    }

    toString(): string {
        return `${this.value}${this.unit}`;
    }
}

export const Px = new FontSize('px', 200, 5, 12);
export const Pt = new FontSize('pt', 100, 5, 12);
export const Em = new FontSize('em', 10, 1, 1);
export const Ex = new FontSize('ex', 20, 1, 1);
export const Percent = new FontSize('%', 200, 1, 10);

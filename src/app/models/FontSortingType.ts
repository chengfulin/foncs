export class FontSortingType {
    private _key: string;
    private _value: string;

    constructor(key: string, value: string) {
        this._key = key;
        this._value = value;
    }

    toString() {
        return this._key;
    }

    value() {
        return this._value;
    }

    isSameAs(type: FontSortingType) {
        return type.toString().trim().toLowerCase() === this._key.trim().toLowerCase()
            && type.value().trim().toLowerCase() === this._value.trim().toLowerCase();
    }
}

export const Trending = new FontSortingType('Trending', 'trending');
export const Popular = new FontSortingType('Popular', 'popularity');
export const DateAdded = new FontSortingType('Date Added', 'date');
export const Alpha = new FontSortingType('Alphabetical', 'alpha');

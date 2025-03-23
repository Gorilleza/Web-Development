class THashStorage {
    constructor() {
        this.storage = {};
    }

    Reset() {
        this.storage = {};
    }

    AddValue(Key, Value) {
        this.storage[Key] = Value;
    }

    GetValue(Key) {
        return this.storage[Key];
    }

    DeleteValue(Key) {
        if (this.storage.hasOwnProperty(Key)) {
            delete this.storage[Key];
            return `Блюдо "${Key}" удалено из меню.`;
        } else {
            return `Блюдо "${Key}" не найдено в меню.`;
        }
    }

    GetKeys() {
        return Object.keys(this.storage);
    }
}
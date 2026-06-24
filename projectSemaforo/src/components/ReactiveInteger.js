class ReactiveInteger {
    constructor(initialValue) {
        this._signal = new Signal(this._toInt(initialValue));
    }

    _toInt(value) {
        const parsed = parseInt(value);
        return isNaN(parsed) ? 0 : parsed;
    }

    get value() {
        return this._signal.value;
    }

    set value(newValue) {
        this._signal.value = this._toInt(newValue);
    }
}

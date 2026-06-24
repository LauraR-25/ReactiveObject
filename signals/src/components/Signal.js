class Signal {
    constructor(initialValue) {
        this._value = parseInt(initialValue);
        this._subscribers = new Set();
    }

    get value() {
        if (Signal.activeEffect) {
            this._subscribers.add(Signal.activeEffect);
        }
        return this._value;
    }

    set value(newValue) {
        const parsed = parseInt(newValue);
        if (parsed !== this._value) {
            this._value = parsed;
            this._notify();
        }
    }

    _notify() {
        this._subscribers.forEach(callback => {
            callback();
        });
    }
}

Signal.activeEffect = null;

const effect = (callback) => {
    const runEffect = () => {
        Signal.activeEffect = runEffect;
        callback();
        Signal.activeEffect = null;
    };
    runEffect();
}

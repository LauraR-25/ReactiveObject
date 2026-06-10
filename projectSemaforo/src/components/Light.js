class Light {
    constructor(id, color, initialState = false) {
        this.id = id;
        this.color = color;
        this._isOn = Boolean(initialState);
        this._subscribers = new Set();

        return new Proxy(this, {
            set: (target, prop, value) => {
                if (prop === "isOn") {
                    const nextValue = Boolean(value);
                    const previousValue = target._isOn;

                    target._isOn = nextValue;

                    if (previousValue !== nextValue) {
                        target._notify();
                    }

                    return true;
                }

                target[prop] = value;
                return true;
            },
            get: (target, prop, receiver) => {
                if (prop === "isOn") {
                    return target._isOn;
                }

                return Reflect.get(target, prop, receiver);
            }
        });
    }

    turnOn() {
        this.isOn = true;
    }

    turnOff() {
        this.isOn = false;
    }

    toggle() {
        this.isOn = !this.isOn;
    }

    subscribe(callback) {
        if (typeof callback !== "function") {
            throw new TypeError("Light.subscribe espera una funcion.");
        }

        this._subscribers.add(callback);

        return () => {
            this._subscribers.delete(callback);
        };
    }

    _notify() {
        const snapshot = this.toJSON();

        this._subscribers.forEach((callback) => {
            callback(snapshot);
        });
    }

    toJSON() {
        return {
            id: this.id,
            color: this.color,
            isOn: this._isOn
        };
    }
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = Light;
}

if (typeof globalThis !== "undefined") {
    globalThis.Light = Light;
}
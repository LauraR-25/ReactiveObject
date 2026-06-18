class EnteroReactivo {
    constructor(valorInicial) {
        this._value = this._sanitizeValue(valorInicial);
        this._subscribers = new Set();

        return new Proxy(this, {
            get: (target, prop, receiver) => {
                if (prop === "value") {
                    return target._value;
                }
                return Reflect.get(target, prop, receiver);
            },

            set: (target, prop, value) => {
                if (prop === "value") {
                    const valorFinal = target._sanitizeValue(value);
                    const valorAnterior = target._value;
                    target._value = valorFinal;

                    if (valorAnterior !== valorFinal) {
                        target._notify();
                    }
                    return true;
                }
                target[prop] = value;
                return true;
            }
        });
    }

    _sanitizeValue(value) {
        const parsed = parseInt(value);
        if (isNaN(parsed)) {
            return 0;
        }
        return parsed;
    }

    subscribe(callback) {
        if (typeof callback !== "function") {
            throw new TypeError("EnteroReactivo.subscribe espera una función.");
        }
        this._subscribers.add(callback);

        return () => {
            this._subscribers.delete(callback);
        };
    }

    _notify() {
        this._subscribers.forEach((callback) => {
            callback(this._value);
        });
    }
}
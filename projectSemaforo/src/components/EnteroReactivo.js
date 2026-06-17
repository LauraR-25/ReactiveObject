class EnteroReactivo {
    constructor(valorInicial) {
        this._value = parseInt(valorInicial);
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
                    const nuevoValor = parseInt(value);
                    const valorAnterior = target._value;
                    target._value = nuevoValor;

                    if (valorAnterior !== nuevoValor) {
                        target._notify();
                    }
                    return true;
                }
                target[prop] = value;
                return true;
            }
        });
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

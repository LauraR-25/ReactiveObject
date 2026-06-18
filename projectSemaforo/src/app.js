document.addEventListener("DOMContentLoaded", () => {

    const x = new EnteroReactivo(5);
    const y = new EnteroReactivo(3);

    const inputX = document.getElementById("input-x");
    const inputY = document.getElementById("input-y");
    const valorZ = document.getElementById("valor-z");

    function render() {
        const z = x.value + y.value;
        inputX.value = x.value;
        inputY.value = y.value;
        valorZ.textContent = z;
        adjustInputWidth(inputX);
        adjustInputWidth(inputY);
    }

    function adjustInputWidth(input) {
        const value = input.value;
        const length = String(value).length;
        let newWidth;
        if (length <= 3) {
            newWidth = '70px';
        } else if (length <= 5) {
            newWidth = '95px';
        } else if (length <= 7) {
            newWidth = '120px';
        } else if (length <= 9) {
            newWidth = '150px';
        } else {
            newWidth = '180px';
        }
        input.style.width = newWidth;
        input.style.fontSize = length > 9 ? '1.2rem' : '1.8rem';
        input.style.fontSize = length > 12 ? '1rem' : input.style.fontSize;
    }

    function limitInput(input, maxDigits) {
        let value = input.value;
        if (value.length > maxDigits) {
            value = value.slice(0, maxDigits);
            input.value = value;
        }
        return value;
    }

    x.subscribe(render);
    y.subscribe(render);
    render();

    inputX.addEventListener("input", (e) => {
        let valor = e.target.value;
        valor = limitInput(e.target, 15);
        if (valor === "") {
            x.value = 0;
        } else {
            const num = parseInt(valor);
            if (!isNaN(num)) {
                x.value = num;
            } else if (valor !== "" && valor !== "-") {
                const currentValue = x.value;
                e.target.value = currentValue;
            }
        }
        adjustInputWidth(e.target);
    });

    inputY.addEventListener("input", (e) => {
        let valor = e.target.value;
        valor = limitInput(e.target, 15);
        if (valor === "") {
            y.value = 0;
        } else {
            const num = parseInt(valor);
            if (!isNaN(num)) {
                y.value = num;
            } else if (valor !== "" && valor !== "-") {
                const currentValue = y.value;
                e.target.value = currentValue;
            }
        }
        adjustInputWidth(e.target);
    });

    inputX.addEventListener("blur", () => {
        if (inputX.value === "" || inputX.value === "-") {
            x.value = 0;
        }
        adjustInputWidth(inputX);
    });

    inputY.addEventListener("blur", () => {
        if (inputY.value === "" || inputY.value === "-") {
            y.value = 0;
        }
        adjustInputWidth(inputY);
    });

    document.getElementById("btn-x-incrementar").addEventListener("click", () => {
        x.value++;
    });

    document.getElementById("btn-x-decrementar").addEventListener("click", () => {
        x.value--;
    });

    document.getElementById("btn-y-incrementar").addEventListener("click", () => {
        y.value++;
    });

    document.getElementById("btn-y-decrementar").addEventListener("click", () => {
        y.value--;
    });
});
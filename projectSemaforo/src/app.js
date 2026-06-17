document.addEventListener("DOMContentLoaded", () => {

    const x = new EnteroReactivo(5);
    const y = new EnteroReactivo(3);

    const valorX = document.getElementById("valor-x");
    const valorY = document.getElementById("valor-y");
    const valorZ = document.getElementById("valor-z");

    function render() {
        const z = x.value + y.value;
        valorX.textContent = x.value;
        valorY.textContent = y.value;
        valorZ.textContent = z;
    }

    x.subscribe(render);
    y.subscribe(render);
    render();

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
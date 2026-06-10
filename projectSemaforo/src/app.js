document.addEventListener("DOMContentLoaded", () => {
    const semaforo = new TrafficLight();
    const btnCambiar = document.getElementById("btn-cambiar-estado");

    if (btnCambiar) {
        btnCambiar.addEventListener("click", () => {
            semaforo.next();
        });
    }
});
// 1. Objeto base (Estado Inicial)
// Esta es la fuente de la verdad para nuestro semáforo.
const estadoSemaforo = {
    color: "rojo"
};

// 2. Capturar el botón del DOM
const btnCambiar = document.getElementById("btn-cambiar-estado");

// 3. Lógica de transición de colores
// Función auxiliar para determinar cuál es el siguiente color lógico
const obtenerSiguienteColor = (colorActual) => {
    switch (colorActual) {
        case "rojo":
            return "verde";
        case "verde":
            return "amarillo";
        case "amarillo":
            return "rojo";
        default:
            return "rojo";
    }
};

// 4. Escuchador de Eventos (Event Listener)
btnCambiar.addEventListener("click", () => {
    // Registramos el estado ANTES del clic (opcional, para depuración)
    console.log(`Estado anterior: ${estadoSemaforo.color}`);

    // Cambiamos el valor interno del objeto
    estadoSemaforo.color = obtenerSiguienteColor(estadoSemaforo.color);

    // Registramos el estado DESPUÉS del clic comprobando que el dato interno mutó
    console.log(`Nuevo estado interno: ${estadoSemaforo.color}`);
    console.log("-----------------------------------");

    // NOTA PARA EL SIGUIENTE INTEGRANTE:
    // Aquí es donde se debe conectar la lógica visual más adelante
    // (Ej. cambiar las clases de CSS de los divs o el texto del párrafo)
});
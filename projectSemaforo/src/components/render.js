const updateIndicatorText = (color) => {
    const indicator = document.getElementById("indicador-texto");
    if (!indicator) return;

    const messages = {
        red: "DETENGASE",
        yellow: "PRECAUCION",
        green: "AVANCE"
    };

    indicator.textContent = messages[color] || "SEMAFORO";
};

const updateLightOnScreen = (lightState) => {
    const { id, color, isOn } = lightState;
    const element = document.getElementById(id);
    if (!element) return;

    if (isOn) {
        element.classList.add("activa");
    } else {
        element.classList.remove("activa");
    }
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = {
        updateLightOnScreen,
        updateIndicatorText
    };
}

if (typeof globalThis !== "undefined") {
    globalThis.updateLightOnScreen = updateLightOnScreen;
    globalThis.updateIndicatorText = updateIndicatorText;
}
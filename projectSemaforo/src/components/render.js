const LIGHT_LABELS = {
    red: "Luz Roja",
    yellow: "Luz Amarilla",
    green: "Luz Verde"
};

const LIGHT_OFF_COLOR = "#2b2b2b";
const LIGHT_OFF_TEXT_COLOR = "#c9c9c9";

const getLightLabel = (color) => LIGHT_LABELS[color] || color;

const updateIndicatorText = (color) => {
    const indicator = document.getElementById("indicador-texto");

    if (!indicator) {
        console.error('[Render] No se encontró ningún elemento HTML con el ID: "indicador-texto"');
        return;
    }

    const messages = {
        red: "¡Deténgase!",
        yellow: "Precaución",
        green: "¡Avance!"
    };

    indicator.textContent = messages[color] || "Semáforo listo";
};

const updateLightOnScreen = (lightState) => {
    const { id, color, isOn } = lightState;

    const element = document.getElementById(id);
    if (!element) {
        console.error(`[Render] No se encontró ningún elemento HTML con el ID: "${id}"`);
        return;
    }

    element.textContent = getLightLabel(color);
    element.style.backgroundColor = isOn ? color : LIGHT_OFF_COLOR;
    element.style.color = isOn ? "#111111" : LIGHT_OFF_TEXT_COLOR;
    element.style.border = `2px solid ${isOn ? color : "#4d4d4d"}`;
    element.style.boxShadow = isOn ? `0 0 18px ${color}` : "none";
    element.style.opacity = isOn ? "1" : "0.65";
    element.setAttribute("aria-pressed", String(Boolean(isOn)));
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
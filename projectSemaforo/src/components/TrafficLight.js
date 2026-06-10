class TrafficLight {
    constructor(renderLightFn = null, renderIndicatorFn = null) {
        const LightClass = typeof Light !== "undefined" ? Light : globalThis.Light;
        
        if (typeof LightClass !== "function") {
            throw new Error("TrafficLight necesita Light disponible");
        }
        this.red = new LightClass("luz-roja", "red", true);
        this.yellow = new LightClass("luz-amarilla", "yellow", false);
        this.green = new LightClass("luz-verde", "green", false);
        this._lights = [this.red, this.yellow, this.green];

        this._renderLight = renderLightFn || (typeof updateLightOnScreen === "function" 
            ? updateLightOnScreen : globalThis.updateLightOnScreen);
            
        this._renderIndicator = renderIndicatorFn || (typeof updateIndicatorText === "function"
            ? updateIndicatorText : globalThis.updateIndicatorText);

        this._lights.forEach((light) => {
            light.subscribe((snapshot) => {
                if (this._renderLight) this._renderLight(snapshot);
                if (snapshot.isOn && this._renderIndicator) {
                    this._renderIndicator(snapshot.color);
                }
            });
        });

        this.render();
    }

    render() {
        this._lights.forEach((light) => {
            if (this._renderLight) this._renderLight(light.toJSON());
        });
        const activeLight = this.getCurrentLight();
        if (activeLight && this._renderIndicator) {
            this._renderIndicator(activeLight.color);
        }
    }

    getCurrentLight() {
        return this._lights.find((light) => light.isOn) || null;
    }

    setActiveColor(color) {
        this._lights.forEach((light) => {
            if (light.color === color) {
                light.turnOn();
            } else {
                light.turnOff();
            }
        });
    }

    next() {
        const currentLight = this.getCurrentLight();
        const currentColor = currentLight ? currentLight.color : "red";

        switch (currentColor) {
            case "red":
                this.setActiveColor("green");
                break;
            case "green":
                this.setActiveColor("yellow");
                break;
            case "yellow":
            default:
                this.setActiveColor("red");
                break;
        }
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = TrafficLight;
} else if (typeof window !== "undefined") {
    window.TrafficLight = TrafficLight;
}
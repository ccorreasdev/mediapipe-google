import ScaleValue from "./ScaleValue.js";
import scaleValue from "./ScaleValue.js";

export default class MouseMove {

    posX;
    posY;

    getMousePosition() {
        return ({
            posX: this.posX,
            posY: this.posY
        })

    }

    mouseMoveListener(model) {
        document.addEventListener("mousemove", (e) => {
            const scaleValue = new ScaleValue();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            this.posX = scaleValue.scaleValue(mouseX, 0, window.innerWidth, -0.5, 0.5);
            this.posY = scaleValue.scaleValue(mouseY, 0, window.innerHeight, 0.5, -0.5);
            gsap.to(model.position, { duration: 1, x: this.posX, y: this.posY - 0.4, z: -2 });
        });

        document.addEventListener('mouseout', (e) => {
            gsap.to(model.position, { duration: 1, x: 0, y: -0.4, z: -2 });
        });
    }



}
import Master from "./Master.js";

export const windowResizeListener = (master, modelBouquet, modelHeart) => {


    window.addEventListener("resize", () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        master.camera.aspect = width / height;
        master.camera.updateProjectionMatrix();
        master.renderer.setSize(width, height);

        if (width >= 1280) {
            modelBouquet.scale.set(1, 1, 1)
            modelHeart.scale.set(1, 1, 1);
        } else if (width >= 768) {
            modelBouquet.scale.set(1, 1, 1)
            modelHeart.scale.set(1, 1, 1);
        } else if (width >= 500) {
            modelBouquet.scale.set(0.6, 0.6, 0.6)
            modelHeart.scale.set(0.6, 0.6, 0.6);
        } else if (width >= 400) {
            modelBouquet.scale.set(0.5, 0.5, 0.5)
            modelHeart.scale.set(0.5, 0.5, 0.5);
        }

    });
}
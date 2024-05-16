import * as THREE from "../build/three.module.js"
import Models from "./Model.js";

let models = new Models();

export const htmlActionsListener = (index) => {

    // posicion2.addEventListener("click", (e) => {
    //     const modelPosition = models.getLoadedModels(index).model.position;
    //     const modelRotation = models.getLoadedModels(index).model.rotation;
    //     gsap.to(modelPosition, { duration: 1, x: -6.5, y: 632, z: -78.5 });
    //     gsap.to(modelRotation, { duration: 1, x: 0, y: 2.5, z: 0 });
    // });


    // posicion.addEventListener("click", (e) => {
    //     const modelPosition = models.getLoadedModels(index).model.position;
    //     const modelRotation = models.getLoadedModels(index).model.rotation;
    //     gsap.to(modelPosition, { duration: 1, x: 0, y: 0, z: 0 });
    //     gsap.to(modelRotation, { duration: 1, x: 0, y: 0, z: 0 });
    // });

    // posicion3.addEventListener("click", (e) => {
    //     const modelPosition = models.getLoadedModels(index).model.position;
    //     const modelRotation = models.getLoadedModels(index).model.rotation;

    //     gsap.to(modelPosition, { duration: 1, x: -0.8, y: 0, z: 6.54 });
    //     gsap.to(modelRotation, { duration: 1, x: 0, y: -0.5, z: 0 });

    //     gsap.to(modelPosition, { delay: 1, duration: 1, x: 0, y: 0, z: 0 });
    //     gsap.to(modelRotation, { delay: 1, duration: 1, x: 0, y: 0, z: 0 });

    //     gsap.to(modelPosition, { delay: 2, duration: 2, x: -0.25, y: 0, z: 6.85 });
    //     gsap.to(modelRotation, { delay: 2, duration: 2, x: 0, y: 0.55, z: 0 });
    // });


};
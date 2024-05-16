import * as THREE from "../build/three.module.js";

export default class Lights {
    directionalLight;
    ambientLight;


    getDirectionalLight() {
        return this.directionalLight;
    }

    getAmbientLight() {
        return this.ambientLight;
    }

    initLights(intensityDirectional, intensityAmbiental) {
        this.ambientLight = new THREE.AmbientLight(0xffffff, intensityAmbiental);
        this.ambientLight.position.set(0, 0, 0);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, intensityDirectional);
        this.directionalLight.position.set(0, 2000, 1000);
        this.directionalLight.lookAt(0, 0, 0);
    }



}
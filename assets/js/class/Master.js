import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../jsm/controls/OrbitControls.js";

export default class Master {
    static camera;
    static scene;
    static renderer;
    mixer;
    orbitControls;

    setAspectRatio(aspectRatio) {
        this.camera.aspect(aspectRatio)
    }

    setRendererSize(width, height) {
        Master.renderer.setSize(width, height);
    }

    getCamera() {
        return this.camera;
    }

    initCamera(verticalField, aspectRation, nearPlane, farPlane) {
        this.camera = new THREE.PerspectiveCamera(verticalField, aspectRation, nearPlane, farPlane);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    }

    initOrbitControls() {
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    }


}
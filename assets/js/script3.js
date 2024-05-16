import FaceDetection from "./FaceDetection.js";
import Master from "./class/Master.js";
import TouchControls from "./class/TouchControls.js";
import Models from "./class/Model.js";
import Lights from "./class/Lights.js";
import KeyListener from "./class/KeyListener.js";
import MouseMove from "./class/MouseMove.js";
import ScrollWindow from "./class/ScrollWindow.js";
import ModelMovement from "./class/ModelMovement.js";
import { htmlActionsListener } from "./class/HTMLActions.js";
import { calculateDistance } from "./class/Distances.js";
import { windowResizeListener } from "./class/WindowResize.js"
const faceDetection = new FaceDetection();
faceDetection.initCamera();


const scaleValue = (value, minInput, maxInput, minOutput, maxOutput) => {
    return minOutput + (maxOutput - minOutput) * ((value - minInput) / (maxInput - minInput));
}


setInterval(() => {

}, 500)




const canvas = document.querySelector("#canvas");
const loading = document.querySelector("#loading");
const loadingLayout = document.querySelector("#loading-layout");
const progressBar = document.querySelector("#progress-bar");
let master = new Master();
let touchControls = new TouchControls();
let models = new Models();
let lights = new Lights();
let keyListener = new KeyListener();
let modelMovement = new ModelMovement();
let mouseMove = new MouseMove();
let scrollWindow = new ScrollWindow();
let bgAnimationTo = false;

const init = async () => {
    //Init master - Camera, scene, lights, renderer...
    master.initCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
    master.camera.position.set(0, 0, 0);
    master.camera.lookAt(0, 0, 0);
    master.initScene();

    lights.initLights(10, 10);

    master.scene.add(lights.getDirectionalLight());
    master.scene.add(lights.getAmbientLight());

    master.initRenderer();
    master.renderer.setPixelRatio(window.devicePixelRatio);
    master.renderer.setSize(window.innerWidth, window.innerHeight);

    canvas.appendChild(master.renderer.domElement);

    master.initOrbitControls();

    //Load 3D Models
    models = new Models();
    loading.style.clipPath = "polygon(0 0, 25% 0, 25% 100%, 0% 100%)";
    await models.loadModelGLTFAnimation("bouquet").then((resolve) => {
        models.percentLoaded = 50;
        loading.style.clipPath = "polygon(0 0, 50% 0, 50% 100%, 0% 100%)";
        return models.loadModelGLTF("heart");
    }).then((resolve) => {
        console.log(loading.src)
        loading.src = "./assets/img/heart.png"
        models.percentLoaded = 100;
        loading.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
        setTimeout(() => {
            loadingLayout.classList.add("loading__layout--hidden");


            setTimeout(() => {
                canvas.classList.add("canvas--active");

            }, 1000);

        }, 1000)
    });

    console.log(models.getLoadedModels(0));
    //Add to scene 3D Models
    models.getLoadedModels(0).mixer.clipAction(models.getLoadedModels(0).animations[0]).play();
    models.getLoadedModels(0).model.scale.set(1, 1, 1)
    models.getLoadedModels(0).model.position.x = 0;
    models.getLoadedModels(0).model.position.y = -0.4;
    models.getLoadedModels(0).model.position.z = -2;
    models.getLoadedModels(0).model.rotation.y = 0;
    master.scene.add(models.getLoadedModels(0).model);


    models.getLoadedModels(1).scale.set(1, 1, 1)
    models.getLoadedModels(1).position.x = 0;
    models.getLoadedModels(1).position.y = 0;
    models.getLoadedModels(1).position.z = -200;
    models.getLoadedModels(1).rotation.y = 0;
    master.scene.add(models.getLoadedModels(1));

    //Listeners
    windowResizeListener(master, models.getLoadedModels(0).model, models.getLoadedModels(1));
    //mouseMove.mouseMoveListener(models.getLoadedModels(0).model);
    scrollWindow.scrollListener();
    keyListener.init();
    //touchControls.initTouchControls(keyListener.getKeysPressed());
    htmlActionsListener(0);


    const width = window.innerWidth;
    const height = window.innerHeight;
    master.camera.aspect = width / height;
    master.camera.updateProjectionMatrix();
    master.renderer.setSize(width, height);

    if (width >= 1280) {
        models.getLoadedModels(0).model.scale.set(1, 1, 1)
        models.getLoadedModels(1).scale.set(1, 1, 1);
    } else if (width >= 768) {
        models.getLoadedModels(0).model.scale.set(1, 1, 1)
        models.getLoadedModels(1).scale.set(1, 1, 1);
    } else if (width >= 500) {
        models.getLoadedModels(0).model.scale.set(0.6, 0.6, 0.6)
        models.getLoadedModels(1).scale.set(0.6, 0.6, 0.6);
    } else if (width >= 400) {
        models.getLoadedModels(0).model.scale.set(0.5, 0.5, 0.5)
        models.getLoadedModels(1).scale.set(0.5, 0.5, 0.5);
    }
};


//Render scene
const render = () => {
    master.renderer.render(master.scene, master.camera);
};

//Animate scene
const animate = () => {
    requestAnimationFrame(animate);

    //Wait last model is loaded
    if (models.getLoadedModels(1)) {



        const eyesPos = faceDetection.getEyesPos();
        console.log(eyesPos.eye1.z);
        const scaleX = scaleValue(eyesPos.eye1.x * window.innerWidth, 0, window.innerWidth, 3.8 - 0.5, -3.8);
        const scaleY = scaleValue(eyesPos.eye1.y * window.innerHeight, 0, window.innerHeight, 0.5, -2.5)

        //models.getLoadedModels(0).model.position.x = scaleX;
        //models.getLoadedModels(0).model.position.y = scaleY;

        gsap.to(models.getLoadedModels(0).model.position, { duration: 1, x: scaleX, y: scaleY });

        models.getLoadedModels(1).rotation.y += 0.01

        //Movement controller model 1 - Garden
        //modelMovement.moveModel(keyListener, models.getLoadedModels(0).model, 5);

        //Camera follow 3D model 1 - plane
        // let distance = 3.5;
        // const objectPosition = models.getLoadedModels(0).model.position;
        // const cameraPosition = new THREE.Vector3(
        //     objectPosition.x,
        //     objectPosition.y + 1.5,
        //     objectPosition.z - distance
        // );

        // master.camera.position.copy(cameraPosition);
        //master.camera.lookAt(objectPosition);

        //Animations mixer

        models.getLoadedModels(0).mixer.update(0.01);


        //Distances from other models
        //calculateDistance(master.camera.position, models.getLoadedModels(4).position, models.getLoadedModels(5).position);

    }




    render();
};


init();
animate();


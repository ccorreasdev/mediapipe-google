const inputVideo = document.querySelector("#input-video");
const inputCanvas = document.querySelector("#canvas-video");
const canvasContext = inputCanvas.getContext("2d");
const pointer = document.querySelector("#pointer");
const optionsFace = {
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
}
const optionsHands = {
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
}


//Calculate
const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx + dx + dy * dy);
};

//FACE DETECTION//
//Draw face mesh
const onResultsFaceMesh = (results) => {
    canvasContext.save();
    canvasContext.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
    canvasContext.drawImage(results.image, 0, 0, inputCanvas.width, inputCanvas.height);

    if (results.multiFaceLandmarks) {
        let eyePos1, eyePos2;


        try {
            if (results.multiFaceLandmarks[0][17]) {
                eyePos1 = results.multiFaceLandmarks[0][0];
                eyePos2 = results.multiFaceLandmarks[0][17];
                const distance = calculateDistance(eyePos2.x, eyePos2.y, eyePos1.x, eyePos1.y);

                const posX = eyePos1.x * window.innerWidth;
                const posY = eyePos1.y * window.innerHeight;

                gsap.to(pointer, { duration: 0.5, left: posX - 100, top: posY });
                gsap.to(pointer, { duration: 0.5, left: posX - 100, width: distance * 1000 });
            }
        } catch (error) {

        }


        for (const landmarks of results.multiFaceLandmarks) {
            drawConnectors(canvasContext, landmarks, FACEMESH_TESSELATION,
                { color: '#c0c0c070', lineWidth: 1 });
            drawConnectors(
                canvasContext, landmarks, FACEMESH_RIGHT_EYE,
                { color: '#FF3030' });
            drawConnectors(
                canvasContext, landmarks, FACEMESH_RIGHT_EYEBROW,
                { color: '#FF3030' });
            drawConnectors(
                canvasContext, landmarks, FACEMESH_LEFT_EYE,
                { color: '#30FF30' });
            drawConnectors(
                canvasContext, landmarks, FACEMESH_LEFT_EYEBROW,
                { color: '#30FF30' });
            drawConnectors(
                canvasContext, landmarks, FACEMESH_FACE_OVAL,
                { color: '#E0E0E0' });
            drawConnectors(
                canvasContext, landmarks, FACEMESH_LIPS,
                { color: '#E0E0E0' });

        }

    }

    canvasContext.restore();
};

//Get the direction of file
const faceMesh = new FaceMesh({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@latest/${file}`;
    }
});
faceMesh.setOptions(optionsFace);
faceMesh.onResults(onResultsFaceMesh);

//Camera init with Google Media Pipe library
const camera = new Camera(inputVideo, {
    onFrame: async () => {
        await faceMesh.send({ image: inputVideo });
    },
    width: 1280,
    height: 720
});
camera.start();


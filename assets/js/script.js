const inputVideo = document.querySelector("#input-video");
const inputCanvas = document.querySelector("#canvas-video");
const canvasContext = inputCanvas.getContext("2d");
const options = {
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
}


//Draw face mesh
const onResultsFaceMesh = (results) => {
    canvasContext.save();
    canvasContext.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
    canvasContext.drawImage(results.image, 0, 0, inputCanvas.width, inputCanvas.height);

    if (results.multiFaceLandmarks) {
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
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    }
});
faceMesh.setOptions(options);
faceMesh.onResults(onResultsFaceMesh);



//Camera init with Google Media Pipe library
const camera = new Camera(inputVideo, {
    onFrame: async () => {
        await faceMesh.send({ image: inputVideo });
    },
    width: 300,
    height: 300
});
camera.start();


//https://mediapipe.readthedocs.io/en/latest/solutions/hands.html
const videoElement = document.querySelector("#input-video");
const canvasElement = document.querySelector("#canvas-video");
const canvasCtx = canvasElement.getContext('2d');
const pointer = document.querySelector("#pointer");
const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx + dx + dy * dy);
};

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {


        if (results && results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0]; // Obtener los landmarks de la primera mano
            if (landmarks && landmarks.length >= 8) {
                const landmark8 = landmarks[8]; // Acceder al landmark número 8 (indice 7)
                const landmark4 = landmarks[4];
                const posX = landmark8.x * window.innerWidth;
                const posY = landmark8.y * window.innerHeight;

                gsap.to(pointer, { duration: 0.5, left: posX - 100, top: posY });

                const distance = calculateDistance(landmark8.x, landmark8.y, landmark4.x, landmark4.y)
                console.log(distance);
                console.log("Coordenadas del landmark 8 de la mano derecha:", landmark8);
            } else {
                console.log("No hay suficientes landmarks en la mano detectada.");
            }
        } else {
            console.log("No se detectaron manos.");
        }


        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                { color: '#00FF00', lineWidth: 1 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        }
    }
    canvasCtx.restore();
}

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720
});
camera.start();
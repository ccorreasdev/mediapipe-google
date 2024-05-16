const videoElement = document.querySelector("#input-video");
const canvasElement = document.querySelector("#canvas-video");
const canvasCtx = canvasElement.getContext('2d');
const pointer = document.querySelector("#pointer");

export default class HandDetection {
    constructor() {
        this.handPos = 0;  // Inicializa handPos
        this.distance = 0;
        this.onResults = this.onResults.bind(this);  // Vincula la función onResults
    }

    getHandPos() {
        return this.handPos;
    }

    getDistance() {
        return this.distance;
    }

    setHandPos(pos) {
        this.handPos = pos;
    }

    calculateDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    onResults(results) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
            results.image, 0, 0, canvasElement.width, canvasElement.height);
        if (results.multiHandLandmarks) {
            if (results && results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                const landmarks = results.multiHandLandmarks[0];
                if (landmarks && landmarks.length >= 8) {
                    const landmark8 = landmarks[8];
                    const landmark4 = landmarks[4];

                    try {
                        this.handPos = landmark8;
                    } catch (error) {
                        console.error(error);
                    }

                    const posX = landmark8.x * window.innerWidth;
                    const posY = landmark8.y * window.innerHeight;
                    this.distance = this.calculateDistance(landmark8.x, landmark8.y, landmark4.x, landmark4.y);
                    gsap.to(pointer, { duration: 0.5, left: posX - 100, top: posY });
                    // gsap.to(pointer, { duration: 0.5, width: distance * 100 + "%" });

                    console.log("Coordenadas del landmark 8 de la mano derecha:", landmark8);
                } else {
                    console.log("No hay suficientes landmarks en la mano detectada.");
                }
            } else {
                console.log("No se detectaron manos.");
            }

            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 1 });
                drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
            }
        }
        canvasCtx.restore();
    }

    initCamera() {
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
        hands.onResults(this.onResults);  // Usa la función onResults vinculada

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await hands.send({ image: videoElement });
            },
            width: 1280,
            height: 720
        });
        camera.start();
    }
}

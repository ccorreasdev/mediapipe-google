const goUp = document.querySelector("#up");
const goDown = document.querySelector("#down");
const goLeft = document.querySelector("#left");
const goRight = document.querySelector("#right");
const goAscend = document.querySelector("#ascend");
const goDescend = document.querySelector("#descend");
const shot = document.querySelector("#shot");

export default class TouchControls {

    initTouchControls(keysPressed) {

        goUp.addEventListener("touchstart", (e) => {

            if (!keysPressed.includes("w")) {
                keysPressed.push("w");
            }
        })

        goUp.addEventListener("touchend", (e) => {
            const index = keysPressed.indexOf("w");
            if (index !== -1) {
                keysPressed.splice(index, 1);
            }
        })

        goDown.addEventListener("touchstart", (e) => {

            if (!keysPressed.includes("s")) {
                keysPressed.push("s");
            }
        })

        goDown.addEventListener("touchend", (e) => {
            const index = keysPressed.indexOf("s");
            if (index !== -1) {
                keysPressed.splice(index, 1);
            }
        })

        goLeft.addEventListener("touchstart", (e) => {

            if (!keysPressed.includes("a")) {
                keysPressed.push("a");
            }
        })

        goLeft.addEventListener("touchend", (e) => {
            const index = keysPressed.indexOf("a");
            if (index !== -1) {
                keysPressed.splice(index, 1);
            }
        })

        goRight.addEventListener("touchstart", (e) => {

            if (!keysPressed.includes("d")) {
                keysPressed.push("d");
            }
        })

        goRight.addEventListener("touchend", (e) => {
            const index = keysPressed.indexOf("d");
            if (index !== -1) {
                keysPressed.splice(index, 1);
            }
        })

        goAscend.addEventListener("touchstart", (e) => {

            if (!keysPressed.includes("e")) {
                keysPressed.push("e");
            }
        })

        goAscend.addEventListener("touchend", (e) => {
            const index = keysPressed.indexOf("e");
            if (index !== -1) {
                keysPressed.splice(index, 1);
            }
        })

        goDescend.addEventListener("touchstart", (e) => {

            if (!keysPressed.includes("q")) {
                keysPressed.push("q");
            }
        })

        goDescend.addEventListener("touchend", (e) => {
            const index = keysPressed.indexOf("q");
            if (index !== -1) {
                keysPressed.splice(index, 1);
            }
        })

        shot.addEventListener("touchstart", (e) => {

            if (!keysPressed.includes(" ")) {
                keysPressed.push(" ");
            }
        })

        shot.addEventListener("touchend", (e) => {
            const index = keysPressed.indexOf(" ");
            if (index !== -1) {
                keysPressed.splice(index, 1);
            }
        })


    }

}
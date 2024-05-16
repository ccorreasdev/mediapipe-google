export default class ModelMovement {

    moveModel(keyListener, model, speed) {
        keyListener.getKeysPressed().forEach((key) => {
            if (key === "w") {
                console.log("W")
                model.position.z += 0.1 * speed;
            }

            if (key === "s") {
                model.position.z -= 0.1 * speed;
            }

            if (key === "a") {
                model.position.x += 0.1 * speed;
            }

            if (key === "d") {
                model.position.x -= 0.1 * speed;
            }
            if (key === "e") {
                model.position.y += 0.1 * speed;
            }

            if (key === "q") {
                model.position.y -= 0.1 * speed;
            }


            if (key === "z") {
                model.rotation.y -= 0.1 * speed;
            }

            if (key === "c") {
                model.rotation.y += 0.1 * speed;
            }
        });
    }

}
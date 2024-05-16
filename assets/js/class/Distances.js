export const calculateDistance = (cameraPosition, model1Position, model2Position) => {

    const minDistance = 30;
    const distanceGoogle = cameraPosition.distanceTo(model1Position);
    const distanceGPT = cameraPosition.distanceTo(model2Position);

    if (distanceGoogle < minDistance) {
        //console.log("GOOGLE");
    }

    if (distanceGPT < minDistance) {
        //console.log("CHAT GPT");
    }
};
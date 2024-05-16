
export default class ScaleValue {

    scaleValue(value, minInput, maxInput, minOutput, maxOutput) {
        return minOutput + (maxOutput - minOutput) * ((value - minInput) / (maxInput - minInput));
    }

}
export default class KeyListener {
    static keysPressed = [];

    getKeysPressed() {
        return KeyListener.keysPressed;
    }

    init() {
        document.addEventListener("keydown", function (event) {
            console.log("Tecla presionada:", event.key);
            if (!KeyListener.keysPressed.includes(event.key)) {
                KeyListener.keysPressed.push(event.key);
            }
        });

        document.addEventListener("keyup", function (event) {
            const index = KeyListener.keysPressed.indexOf(event.key);
            if (index !== -1) {
                KeyListener.keysPressed.splice(index, 1);
            }
        });
    }
}

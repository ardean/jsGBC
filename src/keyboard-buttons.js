import $ from "jquery";
import keyboardMapping from "./keyboard-mapping.js";

class KeyboardButtons {
  bind(gameboy) {
    window.addEventListener("keydown", ({ keyCode }) => gameboy.actionDown(keyboardMapping[keyCode]));
    window.addEventListener("keyup", ({ keyCode }) => gameboy.actionUp(keyboardMapping[keyCode]));
  }
}

export default new KeyboardButtons();

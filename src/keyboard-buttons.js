import $ from "jquery";
import keyboardMapping from "./keyboard-mapping.js";

class KeyboardButtons {
  bind(gameboy) {
    window.addEventListener("keydown", ({ keyCode }) => {
      if (gameboy.actions.is(keyboardMapping[keyCode])) {
        gameboy.actionDown(keyboardMapping[keyCode]);
      }
    });

    window.addEventListener("keyup", ({ keyCode }) => {
      if (gameboy.actions.is(keyboardMapping[keyCode])) {
        gameboy.actionUp(keyboardMapping[keyCode]);
      }
    });
  }
}

export default new KeyboardButtons();

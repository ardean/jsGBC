import $ from "jquery";
import actions from "./actions.js";

class KeyboardButtons {
  bind(gameboy) {
    window.addEventListener("keydown", ({ keyCode }) => {
      const action = actions.fromKeyboard(keyCode);
      if (action) {
        gameboy.actionDown(action);
      }
    });

    window.addEventListener("keyup", ({ keyCode }) => {
      const action = actions.fromKeyboard(keyCode);
      if (action) {
        gameboy.actionUp(action);
      }
    });
  }
}

export default new KeyboardButtons();

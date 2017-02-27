import $ from "jquery";
import gamepad from "jsgamepad";
import actions from "./actions.js";

// TODO: implement save & load state in core

class GamepadButtons {
  bind(gameboy) {
    gamepad.on("buttonPressed", ({ buttonIndex, button, gamepad }) => {
      const action = actions.fromGamepad(buttonIndex);
      if (action) {
        gameboy.actionDown(action);
      }
    });

    gamepad.on("buttonChanged", ({ buttonIndex, button, gamepad }) => {
      const action = actions.fromGamepad(buttonIndex);
      if (action) {
        gameboy.actionChange(action, {
          value: button.value
        });
      }
    });

    gamepad.on("buttonReleased", ({ buttonIndex, button, gamepad }) => {
      const action = actions.fromGamepad(buttonIndex);
      if (action) {
        gameboy.actionUp(action);
      }
    });

    gamepad.watch();
  }
}

export default new GamepadButtons();
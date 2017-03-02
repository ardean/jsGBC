import $ from "jquery";
import gamepad from "jsgamepad";
import { Standard as gamepadMapping } from "./gamepad-mappings.js";

// TODO: implement save & load state in core

class GamepadButtons {
  bind(gameboy) {
    gamepad.on("buttonPressed", ({ buttonIndex, button, gamepad }) => {
      if (gameboy.actions.is(gamepadMapping[buttonIndex])) {
        gameboy.actionDown(gamepadMapping[buttonIndex]);
      }
    });

    gamepad.on("buttonChanged", ({ buttonIndex, button, gamepad }) => {
      if (gameboy.actions.is(gamepadMapping[buttonIndex])) {
        gameboy.actionChange(gamepadMapping[buttonIndex], {
          value: button.value
        });
      }
    });

    gamepad.on("buttonReleased", ({ buttonIndex, button, gamepad }) => {
      if (gameboy.actions.is(gamepadMapping[buttonIndex])) {
        gameboy.actionUp(gamepadMapping[buttonIndex]);
      }
    });

    gamepad.watch();
  }
}

export default new GamepadButtons();

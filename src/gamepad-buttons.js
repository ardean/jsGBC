import $ from "jquery";
import gamepad from "jsgamepad";
import { Standard as gamepadMapping } from "./gamepad-mappings.js";

class GamepadButtons {
  bind(gameboy) {
    gamepad
      .on("buttonPressed", ({ buttonIndex, button, gamepad }) => gameboy.actionDown(gamepadMapping[buttonIndex]))
      .on("buttonChanged", ({ buttonIndex, button, gamepad }) => gameboy.actionChange(gamepadMapping[buttonIndex], { value: button.value }))
      .on("buttonReleased", ({ buttonIndex, button, gamepad }) => gameboy.actionUp(gamepadMapping[buttonIndex]))
      .watch();
  }
}

export default new GamepadButtons();

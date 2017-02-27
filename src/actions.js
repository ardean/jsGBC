import keyboardMapping from "./keyboard-mapping.js";
import { Standard as gamepadMapping } from "./gamepad-mappings.js";

class Actions {
  actions = ["up", "right", "down", "left", "a", "b", "select", "start", "speed"]; // TODO: move actions list to core

  isAction(action) {
    return this.actions.indexOf(action) > -1;
  }

  fromKeyboard(keyCode) {
    const action = keyboardMapping[keyCode];
    if (!this.isAction(action)) return null;
    return action;
  }

  fromGamepad(buttonIndex) {
    const action = gamepadMapping[buttonIndex];
    if (!this.isAction(action)) return null;
    return action;
  }
}

export default new Actions();
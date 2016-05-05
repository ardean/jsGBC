import {
  EventEmitter
} from "events";

export default class ControllerProfile extends EventEmitter {
  constructor(name, keyMap) {
    super();

    this.name = name;
    this.keyMap = keyMap;
  }

  getAction(keyIndex) {
    return this.keyMap[keyIndex];
  }
}

import EventEmitter from "events";

export default class GamepadProfile extends EventEmitter {
  constructor(name, keyMap) {
    super();

    this._id = name.toLowerCase().replace(/ /ig, "-");
    this.name = name;
    this.keyMap = keyMap;
  }

  getAction(keyIndex) {
    return this.keyMap[keyIndex];
  }
}

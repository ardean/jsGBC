import EventEmitter from "events";

export default class ControllerProfile extends EventEmitter {
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

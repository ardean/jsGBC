import EventEmitter from "events";

class Controller extends EventEmitter {
  constructor() {
    super();

    this.isListening = false;
    this.controllers = [];
    this.pressedButtons = {};

    window.addEventListener("gamepadconnected", (e) => {
      console.log("gamepad connected");
      this.addGamepad(e.gamepad);
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      console.log("gamepad disconnected");
      this.removeGamepad(e.gamepad);
    });

    this.gamepadTick = this.gamepadTick.bind(this);
  }

  addGamepad(gamepad) {
    this.controllers.push(gamepad);
  }

  removeGamepad(gamepad) {
    var index = this.controllers.indexOf(gamepad);
    if (index > -1) {
      this.controllers.splice(index, 1);
    }
  }

  gamepadTick() {
    if (!navigator.getGamepads) return console.warn("Your Browser does not support gamepad api!");
    if (!this.isListening) return;

    const gamepad = navigator.getGamepads()[0];
    if (gamepad) {
      var buttons = gamepad.buttons;
      for (var j = 0; j < buttons.length; j++) {
        var button = this.getButtonValue(buttons[j]);
        if (!this.wasButtonPressed(j) && this.isButtonPressed(button)) {
          this.pressedButtons[j] = button.value;
          this.emit("press", j, button);
        }

        if (this.wasButtonPressed(j) && this.isButtonPressed(button) && this.changedButtonValue(button, j)) {
          this.pressedButtons[j] = button.value;
          this.emit("changed", j, button);
        }

        if (this.wasButtonPressed(j) && !this.isButtonPressed(button)) {
          this.pressedButtons[j] = false;
          this.emit("release", j, button);
        }
      }
    }

    window.requestAnimationFrame(this.gamepadTick);
  }

  startListener() {
    this.isListening = true;
    this.gamepadTick();
  }

  stopListener() {
    this.isListening = false;
  }

  getButtonValue(button) {
    if (typeof button === "object") {
      return button;
    }

    return {
      pressed: button === 1.0,
      value: button
    };
  }

  isButtonPressed(button) {
    return button.pressed;
  }

  wasButtonPressed(index) {
    return !!this.pressedButtons[index];
  }

  changedButtonValue(button, index) {
    return button.value !== this.pressedButtons[index];
  }
}

export default new Controller();

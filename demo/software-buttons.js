import $ from "jquery";

class SoftwareButtons {
  bind(gameboy) {
    [
      "up",
      "right",
      "down",
      "left",
      "a",
      "b",
      "select",
      "start"
    ].forEach(action => {
      $(".gbc-button-" + action)
        .on("mousedown", () => gameboy.actionDown(action))
        .on("mouseup", () => gameboy.actionUp(action));
    });
  }
}

export default new SoftwareButtons();

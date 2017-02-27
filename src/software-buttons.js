import $ from "jquery";
import actions from "./actions.js";

class SoftwareButtons {
  bind(gameboy, jsGBCui) {
    jsGBCui.addEventListener("down", ({ detail }) => {
      if (actions.isAction(detail.button)) {
        gameboy.actionDown(detail.button);
      }
    });

    jsGBCui.addEventListener("up", ({ detail }) => {
      if (actions.isAction(detail.button)) {
        gameboy.actionUp(detail.button);
      }
    });
  }
}

export default new SoftwareButtons();

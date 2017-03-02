import $ from "jquery";

class SoftwareButtons {
  bind(gameboy, jsGBCui) {
    jsGBCui.addEventListener("down", ({ detail }) => {
      if (gameboy.actions.is(detail.button)) {
        gameboy.actionDown(detail.button);
      }
    });

    jsGBCui.addEventListener("up", ({ detail }) => {
      if (gameboy.actions.is(detail.button)) {
        gameboy.actionUp(detail.button);
      }
    });
  }
}

export default new SoftwareButtons();

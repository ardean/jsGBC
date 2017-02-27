import $ from "jquery";
import GameBoy from "jsgbc-core";
import softwareButtons from "./software-buttons.js";
import keyboardButtons from "./keyboard-buttons.js";
import gamepadButtons from "./gamepad-buttons.js";
import initElectron from "./electron.js";

if (window.WebComponentsReady) {
  init();
} else {
  window.addEventListener("WebComponentsReady", init);
}

function init() {
  const $jsGBCui = $("jsgbc-ui");
  const jsGBCui = $jsGBCui.get(0);
  const $screen = $(jsGBCui.screenElement);
  const gameboy = new GameBoy(jsGBCui.lcdElement);

  initElectron(gameboy);

  keyboardButtons.bind(gameboy);
  softwareButtons.bind(gameboy, jsGBCui);
  gamepadButtons.bind(gameboy);

  $jsGBCui.removeAttr("loading");
}
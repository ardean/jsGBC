import $ from "jquery";
import Fullscreen from "./fullscreen.js";

export default function (gameboy, jsGBCui) {
  if (require) {
    const { ipcRenderer } = require("electron");

    const fullscreen = new Fullscreen();
    let isServerRequested = false;
    fullscreen.on("change", isActive => {
      if (isActive) {
        if (isServerRequested) {
          isServerRequested = false;
        } else {
          ipcRenderer.send("maximize");
        }
        jsGBCui.fullscreen = true;
      } else {
        if (isServerRequested) {
          isServerRequested = false;
        } else {
          ipcRenderer.send("unmaximize");
        }
        jsGBCui.fullscreen = false;
      }
    });

    $(jsGBCui.screenElement).on("dblclick", () => {
      fullscreen.toggle();
    });

    ipcRenderer.on("open-rom", (e, rom) => {
      gameboy.replaceCartridge(rom);
    }).on("requestFullscreen", () => {
      isServerRequested = true;
      fullscreen.request();
    }).on("cancelFullscreen", () => {
      isServerRequested = true;
      fullscreen.cancel();
    });

    ipcRenderer.send("ready");
  }
}

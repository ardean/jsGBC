import $ from "jquery";
import Fullscreen from "./fullscreen.js";
import { isWindows } from "../util.js";

export default function (gameboy, jsGBCui) {
  if (require) {
    const { ipcRenderer } = require("electron");

    if (isWindows()) {
      $("body").css("padding-top", 0);
    }

    const fullscreen = new Fullscreen();
    fullscreen.on("change", isActive => {
      if (isActive) {
        ipcRenderer.send("requestFullscreen");
        jsGBCui.fullscreen = true;
      } else {
        ipcRenderer.send("cancelFullscreen");
        jsGBCui.fullscreen = false;
      }
    });

    $(jsGBCui.screenElement).on("dblclick", () => {
      fullscreen.toggle();
    });

    ipcRenderer.on("open-rom", (e, rom) => {
      gameboy.replaceCartridge(rom);
    }).on("requestFullscreen", () => {
      fullscreen.request();
    }).on("cancelFullscreen", () => {
      fullscreen.cancel();
    });

    ipcRenderer.send("ready");
  }
}

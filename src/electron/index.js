import $ from "jquery";
import { util } from "jsgbc-core";
import Fullscreen from "./fullscreen.js";

export default function (gameboy, jsGBCui) {
  if (require) {
    const { ipcRenderer } = require("electron");
    const $jsGBCui = $(jsGBCui);

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
    }).on("open-battery-file", (e, batteryFile) => {
      gameboy.loadBatteryFileArrayBuffer(batteryFile);
    }).on("save-battery-file", () => {
      util.downloadFile(gameboy.core.cartridgeSlot.cartridge.name + ".sav", gameboy.getBatteryFileArrayBuffer());
    }).on("toggle-pixelation", (e, hasPixelation) => {
      if (hasPixelation) {
        $jsGBCui.removeAttr("no-pixelation");
      } else {
        $jsGBCui.attr("no-pixelation", true);
      }
    }).on("toggle-fullscreen", (e, isActive) => {
      isServerRequested = true;
      if (isActive) {
        fullscreen.request();
      } else {
        fullscreen.cancel();
      }
    });

    ipcRenderer.send("ready");
  }
}

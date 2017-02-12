import { Buffer } from "buffer";
import settings from "./settings.js";
import GameBoyCore from "./core/index.js";
import EventEmitter from "events";

export default class GameBoy extends EventEmitter {
  constructor(canvas) {
    super();

    this.core = new GameBoyCore(canvas);
    this.core.openMBC = this.openSRAM.bind(this);
    this.core.openRTC = this.openRTC.bind(this);

    this.isOn = false;
  }

  turnOn() {
    if (this.isOn) return;
    this.isOn = true;

    this.core.start(this.ROMImage);
    this.core.stopEmulator &= 1;
    this.core.firstIteration = new Date().getTime();
    this.core.iterations = 0;
    this.interval = setInterval(
      () => {
        if (
          !document.hidden &&
            !document.msHidden &&
            !document.mozHidden &&
            !document.webkitHidden
        ) {
          this.core.run();
        }
      },
      settings.runInterval
    );
  }

  turnOff() {
    if (!this.isOn) return;
    this.isOn = false;

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  restart() {
    this.turnOff();
    this.turnOn();
  }

  injectRom(rom) {
    this.ROMImage = rom;
  }

  actionDown(action) {
    this.core.JoyPadEvent(this.getButtonIndex(action), true);
  }

  actionUp(action) {
    this.core.JoyPadEvent(this.getButtonIndex(action), false);
  }

  setSpeed(multiplier) {
    this.core.setSpeed(multiplier);
  }

  getButtonIndex(action) {
    const keymap = ["right", "left", "up", "down", "a", "b", "select", "start"];
    for (let index = 0; index < keymap.length; index++) {
      if (keymap[index] === action) {
        return index;
      }
    }
    return -1;
  }

  autoSave() {
    this.saveSRAM();
    this.saveRTC();
  }

  saveSRAM() {
    var sram = this.core.saveSRAMState();
    if (sram.length > 0) {
      this.setLocalStorageValue(
        "B64_SRAM_" + this.core.name,
        arrayToBase64(sram)
      );
    }
  }

  saveRTC() {
    if (this.core.hasRTC) {
      this.setLocalStorageValue(
        "RTC_" + this.core.name,
        this.core.saveRTCState()
      );
    }
  }

  openSRAM(filename) {
    const value = this.findLocalStorageValue("B64_SRAM_" + filename);
    if (value) {
      return new Buffer(value, "base64");
    }

    return [];
  }

  openRTC(filename) {
    const value = this.findLocalStorageValue("RTC_" + filename);
    if (value) {
      return value;
    }

    return [];
  }

  saveState(filename) {
    this.setLocalStorageValue(filename, this.core.saveState());
    this.emit("stateSaved", { filename });
  }

  openState(filename) {
    const value = this.findLocalStorageValue(filename);
    if (value) {
      this.core.savedStateFileName = filename;
      this.core.loadState(value);
      this.emit("stateLoaded", { filename });
    }
  }

  setLocalStorageValue(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  findLocalStorageValue(key) {
    if (window.localStorage.getItem(key) !== null) {
      return JSON.parse(window.localStorage.getItem(key));
    }
  }
}

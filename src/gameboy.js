import { Buffer } from "buffer";
import settings from "./settings.js";
import GameBoyCore from "./core/index.js";
import EventEmitter from "events";
import debounce from "debounce";

export default class GameBoy extends EventEmitter {
  constructor(canvas) {
    super();

    this.debouncedAutoSave = debounce(this.autoSave.bind(this), 100);

    this.core = new GameBoyCore(canvas);
    this.core.loadSRAMState = this.loadSRAMState.bind(this);
    this.core.loadRTCState = this.loadRTCState.bind(this);
    this.core.onMBC3Write = () => {
      if (!this.core.cartridgeSlot.cartridge) return;
      this.debouncedAutoSave();
    };

    this.isOn = false;
  }

  turnOn() {
    if (this.isOn) return;
    this.isOn = true;

    this.core.start(this.ROMImage);
    this.core.stopEmulator &= 1;
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
    this.saveSRAMState(this.core.cartridgeSlot.cartridge.name);
    this.saveRTCState(this.core.cartridgeSlot.cartridge.name);
  }

  saveSRAMState(filename) {
    const sram = this.core.saveSRAMState();
    if (sram) {
      this.setLocalStorageValue("SRAM_" + filename, sram);
    }
  }

  saveRTCState(filename) {
    const rtc = this.core.saveRTCState();
    if (rtc) {
      this.setLocalStorageValue("RTC_" + filename, rtc);
    }
  }

  loadSRAMState(filename) {
    return this.findLocalStorageValue("SRAM_" + filename);
  }

  loadRTCState(filename) {
    return this.findLocalStorageValue("RTC_" + filename);
  }

  saveState(filename) {
    this.setLocalStorageValue(filename, this.core.saveState());
    this.emit("stateSaved", { filename });
  }

  loadState(filename) {
    const value = this.findLocalStorageValue(filename);
    if (value) {
      this.core.savedStateFileName = filename;
      this.core.loadState(value);
      this.emit("stateLoaded", { filename });
    }
  }

  setLocalStorageValue(key, value) {
    window.localStorage.setItem(key, btoa(JSON.stringify(value)));
  }

  findLocalStorageValue(key) {
    if (window.localStorage.getItem(key) !== null) {
      return JSON.parse(atob(window.localStorage.getItem(key)));
    }
  }
}

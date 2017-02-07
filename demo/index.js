import { GameBoy, ControllerProfile } from "../src/index.js";
import $ from "jquery";
import notifier from "./notifier.js";
import Fullscreen from "jsfullscreen";
import PointerLock from "jspointerlock";
import gamepad from "jsgamepad";
import controllerProfileMap from "./controller-profiles.js";

let currentControllerProfile;
const $canvas = $(".screen");
const canvas = $canvas.get(0);
const gameboy = new GameBoy(canvas);
const fullscreen = new Fullscreen(canvas);
const pointerLock = new PointerLock(canvas);
const $loading = $(".loading");
$loading.hide();
notifier.appendTo(document.body);

$(document)
  .on("keydown", function (e) {
    const action = keyboardProfile.getAction(e.keyCode);
    if (action) {
      gameboyHandlePressAction(action);
      e.preventDefault();
    }
  })
  .on("keyup", function (e) {
    const action = keyboardProfile.getAction(e.keyCode);
    if (action) {
      gameboyHandleReleaseAction(action);
      e.preventDefault();
    }
  });

$canvas
  .on("dblclick", () => {
    toggleFullscreen();
  });

const controllerProfiles = Object.keys(controllerProfileMap).map((profileName) => {
  const profile = controllerProfileMap[profileName];
  return new ControllerProfile(profileName, profile);
});

const $controllerProfileSelector = $(".controller-profile-selector");
let controllerProfileHtml = "";
controllerProfiles.forEach((controllerProfile) => {
  controllerProfileHtml += `<option value="${controllerProfile._id}">${controllerProfile.name}</option>\n`;
});
$controllerProfileSelector.html(controllerProfileHtml);

const firstChild = $controllerProfileSelector.children().get(0);
setControllerProfile(firstChild);
$controllerProfileSelector.on("change", controllerChange);

const keyboardProfile = new ControllerProfile("Keyboard", {
  13: "start",
  16: "select",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  88: "a",
  90: "b"
});

fullscreen.on("change", () => {
  if (fullscreen.isActive) {
    $canvas.addClass("fullscreen");
  } else {
    PointerLock.exitPointerLock();
    $canvas.removeClass("fullscreen");
  }
});

gamepad.on("buttonPressed", function ({ buttonIndex, button, gamepad }) {
  const action = currentControllerProfile.getAction(buttonIndex);
  gameboyHandlePressAction(action, button);
});

gamepad.on("buttonChanged", function ({ buttonIndex, button, gamepad }) {
  const action = currentControllerProfile.getAction(buttonIndex);
  if (action === "speed") {
    gameboy.setSpeed(getSpeedValue(button));
  }
});

gamepad.on("buttonReleased", function ({ buttonIndex, button, gamepad }) {
  const action = currentControllerProfile.getAction(buttonIndex);
  gameboyHandleReleaseAction(action);
});

gamepad.watch();

function controllerChange(e) {
  const selectedOption = e.target.options[e.target.selectedIndex];
  setControllerProfile(selectedOption);
}

function setControllerProfile(item) {
  const controllerProfile = controllerProfiles.find((controllerProfile) => {
    return item.value === controllerProfile._id;
  });

  if (controllerProfile) {
    currentControllerProfile = controllerProfile;
  } else {
    console.warn("Controller Profile not found!");
  }
}

$(".upload-state").on("change", function () {
  if (this.files.length > 0) {
    const file = this.files[0];
    const binaryHandle = new FileReader();
    binaryHandle.onload = () => {
      if (this.readyState === 2) {
        gameboy.core.savedStateFileName = file.name;
        gameboy.core.returnFromState(JSON.parse(this.result));
      }
    };
    binaryHandle.readAsBinaryString(file);
  }
});

$(".download-state").on("click", () => {
  saveData(gameboy.core.saveState(), gameboy.core.name + ".s0");
});

$(".rom").on("change", function () {
  if (this.files.length > 0) {
    var file = this.files[0];
    var binaryHandle = new FileReader();
    binaryHandle.onload = function () {
      if (this.readyState === 2) {
        gameboy.injectRom(this.result);
        gameboy.restart();
      }
    };
    binaryHandle.readAsBinaryString(file);
  }
});

window.addEventListener("unload", function () {
  // gameboy.autoSave();
});

var saveData = (function () {
  var a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  return function (data, fileName) {
    var json = JSON.stringify(data);
    var blob = new Blob([json], {
      type: "octet/stream"
    });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());

function toggleFullscreen() {
  if (fullscreen.isActive) {
    Fullscreen.exitFullscreen();
    PointerLock.exitPointerLock();
  } else {
    fullscreen.requestFullscreen();
    pointerLock.requestPointerLock();
  }
}

function getSpeedValue(button) {
  return (button.value * 2) + 1;
}

function gameboyHandlePressAction(action, button) {
  if (action === "save") {
    saveAndNotifyState();
  } else if (action === "load") {
    openAndNotifyState();
  } else if (action === "speed") {
    if (button) {
      gameboy.setSpeed(getSpeedValue(button));
    }
  } else if (action === "fullscreen") {
    toggleFullscreen();
  } else {
    gameboy.actionDown(action);
  }
}

function gameboyHandleReleaseAction(action) {
  if (action === "speed") {
    gameboy.setSpeed(1);
  } else {
    gameboy.actionUp(action);
  }
}

function saveAndNotifyState() {
  const filename = gameboy.core.cartridgeSlot.cartridge.name + ".s0";
  // gameboy.saveState(filename);

  notifier.notify("Save " + filename);
}

function openAndNotifyState() {
  const filename = gameboy.core.cartridgeSlot.cartridge.name + ".s0";
  // gameboy.openState(filename, canvas);

  notifier.notify("Loaded " + filename);
}

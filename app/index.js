const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const OpenROMDialog = require("./open-rom-dialog");
const OpenBatteryFileDialog = require("./open-battery-file-dialog");
const { isMacOS, isWindows, isProduction } = require("./util");
const WindowServer = require("./window-server");
const createMenuTemplate = require("./menu");
const { log } = require("util");
const path = require("path");
const fs = require("fs");

let windowHeight = 732;
if (isWindows()) {
  windowHeight = 710;
}

let romPathToLoad = process.argv[1] || null;

const openROMDialog = new OpenROMDialog(openROM);
const openBatteryFileDialog = new OpenBatteryFileDialog(openBatteryFile);
let indexPath = path.join(__dirname, "./dist/index.html");
if (!isProduction()) {
  indexPath = path.join(__dirname, "../index.html");
}

const mainWindowServer = new WindowServer(
  indexPath, {
    width: 400,
    height: windowHeight,
    frame: !isMacOS(),
    titleBarStyle: "hidden",
    useContentSize: true,
    resizable: false,
    transparent: isMacOS(),
    fullscreenable: true
  }
);

mainWindowServer
  .on("clientReady", () => {
    if (isProduction()) {
      openROM(romPathToLoad);
    }
  })
  .on("closed", () => {
    romPathToLoad = null;
  });

app
  .on("open-file", (e, filePath) => {
    e.preventDefault();
    romPathToLoad = filePath;

    if (mainWindowServer && mainWindowServer.isClientReady) {
      openROM(romPathToLoad);
    }
  })
  .on("ready", () => {
    mainWindowServer.open();

    Menu.setApplicationMenu(
      Menu.buildFromTemplate(
        createMenuTemplate(mainWindowServer, {
          openROMDialog,
          openBatteryFileDialog,
          saveBatteryFile,
          togglePixelation
        })
      )
    );
  })
  .on("window-all-closed", () => {
    if (!isMacOS()) {
      app.quit();
    }
  })
  .on("activate", () => {
    mainWindowServer.open();
  });

function openROM(romPath) {
  if (!romPath) return;

  try {
    const fileContent = fs.readFileSync(romPath);
    mainWindowServer.sendToClient("open-rom", fileContent);
  } catch (e) {
    log(e);
  }
}

function openBatteryFile(batteryFilePath) {
  if (!batteryFilePath) return;

  try {
    const fileContent = fs.readFileSync(batteryFilePath);
    mainWindowServer.sendToClient("open-battery-file", fileContent);
  } catch (e) {
    log(e);
  }
}

function saveBatteryFile() {
  mainWindowServer.sendToClient("save-battery-file");
}

function togglePixelation(menuItem) {
  mainWindowServer.sendToClient("toggle-pixelation", menuItem.checked);
}

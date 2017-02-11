const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { log } = require("util");
const { isOSX, isWindows, isProduction } = require("./util");
const createMenuTemplate = require("./menu");
const OpenROMDialog = require("./open-rom-dialog");

const openROMDialog = new OpenROMDialog(openROM);

let mainWindow;
let romPathToLoad = process.argv[1] || null;

app
  .on("open-file", (e, filePath) => {
    e.preventDefault();
    romPathToLoad = filePath;
  })
  .on("ready", () => {
    createWindow();

    Menu.setApplicationMenu(
      Menu.buildFromTemplate(
        createMenuTemplate(mainWindow, {
          openROMDialog: openROMDialog
        })
      )
    );
  })
  .on("window-all-closed", () => {
    if (!isOSX()) {
      app.quit();
    }
  })
  .on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 709,
    frame: false,
    titleBarStyle: "hidden",
    resizable: false,
    transparent: true
  });

  const indexUrl = url.format({
    pathname: path.join(__dirname, "../index.html"),
    protocol: "file:",
    slashes: true
  });

  ipcMain.on("ready", () => {
    if (isProduction()) {
      openROM(romPathToLoad);
    }
  });

  mainWindow.loadURL(indexUrl);
  mainWindow.on("closed", () => {
    romPathToLoad = null;
    mainWindow = null;
  });
}

function openROM(romPath) {
  if (!romPath) return;

  try {
    const fileContent = fs.readFileSync(romPath);
    mainWindow.webContents.send("open-rom", fileContent);
  } catch (e) {
    log(e);
  }
}

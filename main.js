const electron = require("electron");
const path = require("path");
const url = require("url");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app
  .on("ready", createWindow)
  .on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  })
  .on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    // titleBarStyle: "hidden"
    titleBarStyle: 'hidden-inset'
  });

  // mainWindow.webContents.openDevTools();

  const indexUrl = url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  });

  mainWindow.loadURL(indexUrl);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

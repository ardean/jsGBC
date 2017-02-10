const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");
const url = require("url");
const { isOSX } = require("./util");

let mainWindow;
const menuTemplate = [
  isOSX()
    ? {
        label: app.getName(),
        submenu: [
          {
            label: "About",
            click() {
              shell.openExternal("https://ardean.github.io/jsGBC");
            }
          }
        ]
      }
    : []
];

app
  .on("ready", () => {
    createWindow();

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
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

  mainWindow.webContents.openDevTools();

  const indexUrl = url.format({
    pathname: path.join(__dirname, "../index.html"),
    protocol: "file:",
    slashes: true
  });

  mainWindow.loadURL(indexUrl);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

const { BrowserWindow, ipcMain } = require("electron");
const EventEmitter = require("events");
const url = require("url");
const { isMacOS } = require("./util.js");

class WindowServer extends EventEmitter {
  constructor(url, options) {
    super();
    this.url = url;
    this.windowOptions = options;
  }

  open(options) {
    if (this.isWindowOpen) return;
    this.window = new BrowserWindow(options || this.windowOptions);

    const indexUrl = url.format({
      pathname: this.url,
      protocol: "file:",
      slashes: true
    });

    if (isMacOS()) {
      this.window.on("enter-full-screen", () => {
        this.window.setResizable(true);
        if (this.isClientRequested) return this.isClientRequested = false;
        this.sendToClient("toggle-fullscreen", true);
      }).on("leave-full-screen", () => {
        this.window.setResizable(false);
        if (this.isClientRequested) return this.isClientRequested = false;
        this.sendToClient("toggle-fullscreen", false);
      });
    } else {
      this.window.on("maximize", () => {
        if (this.isClientRequested) return this.isClientRequested = false;
        this.sendToClient("toggle-fullscreen", true);
      }).on("unmaximize", () => {
        if (this.isClientRequested) return this.isClientRequested = false;
        this.sendToClient("toggle-fullscreen", false);
      });
    }

    ipcMain.on("ready", () => {
      this.isClientReady = true;
      this.emit("clientReady");
    }).on("maximize", () => {
      this.isClientRequested = true;
      this.maximize();
    }).on("unmaximize", () => {
      this.isClientRequested = true;
      this.unmaximize();
    });

    this.window.loadURL(indexUrl);
    this.window.on("closed", () => {
      this.isClientReady = false;
      this.window = null;
      this.emit("closed");
    });
  }

  sendToClient(name, options) {
    this.window.webContents.send(name, options);
  }

  maximize() {
    if (isMacOS()) {
      this.window.setFullScreen(true);
    } else {
      this.window.maximize();
    }
  }

  unmaximize() {
    if (isMacOS()) {
      this.window.setFullScreen(false);
    } else {
      this.window.unmaximize();
    }
  }

  get isWindowOpen() {
    return !!this.window;
  }
}

module.exports = WindowServer;

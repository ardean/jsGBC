const { BrowserWindow, ipcMain } = require("electron");
const EventEmitter = require("events");
const url = require("url");

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

    this.window.on("enter-full-screen", () => {
      this.sendToClient("requestFullscreen");
      this.enableFullscreen();
    }).on("leave-full-screen", () => {
      this.sendToClient("cancelFullscreen");
      this.disableFullscreen();
    });

    ipcMain.on("ready", () => {
      this.isClientReady = true;
      this.emit("clientReady");
    }).on("requestFullscreen", () => {
      this.enableFullscreen();
    }).on("cancelFullscreen", () => {
      this.disableFullscreen();
    });

    this.window.loadURL(indexUrl);
    this.window.on("closed", () => {
      this.isClientReady = false;
      this.window = null;
      this.emit("closed");
    });
  }

  enableFullscreen() {
    this.window.setResizable(true);
    this.window.setFullScreen(true);
  }

  disableFullscreen() {
    this.window.setFullScreen(false);
    this.window.setResizable(false);
  }

  sendToClient(name, options) {
    this.window.webContents.send(name, options);
  }

  get isWindowOpen() {
    return !!this.window;
  }
}

module.exports = WindowServer;

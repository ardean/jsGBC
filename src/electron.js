export default function(gameboy) {
  if (require) {
    const { ipcRenderer } = require("electron");

    ipcRenderer.on("open-rom", (e, rom) => {
      gameboy.replaceCartridge(rom);
    });

    ipcRenderer.send("ready");
  }
}

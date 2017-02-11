export default function(gameboy) {
  if (require) {
    const { ipcRenderer } = require("electron");

    ipcRenderer.on("open-rom", (e, rom) => {
      gameboy.injectRom(rom);
      gameboy.restart();
    });

    ipcRenderer.send("ready");
  }
}

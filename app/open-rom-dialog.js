const { dialog } = require("electron");

class OpenROMDialog {
  constructor(openROM) {
    this.openROM = openROM;
    this.show = this.show.bind(this);
  }

  show() {
    const filePaths = dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "GB / GBC", extensions: ["gb", "gbc"] }]
    });
    if (!filePaths) return;

    this.openROM(filePaths[0]);
  }
}

module.exports = OpenROMDialog;

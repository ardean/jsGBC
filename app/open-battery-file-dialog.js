const { dialog } = require("electron");

class OpenBatteryFileDialog {
  constructor(openBatteryFile) {
    this.openBatteryFile = openBatteryFile;
    this.show = this.show.bind(this);
  }

  show() {
    const filePaths = dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Battery File", extensions: ["sav"] }]
    });
    if (!filePaths) return;

    this.openBatteryFile(filePaths[0]);
  }
}

module.exports = OpenBatteryFileDialog;

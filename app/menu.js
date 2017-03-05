const { app, shell } = require("electron");
const { isMacOS } = require("./util");

module.exports = function (mainWindowServer, options) {
  const gamepadMappingMenu = [{
    label: "Standard",
    type: "radio",
    checked: true
  }];

  const menu = [{
      label: "File",
      submenu: [{
        label: "Open ROM...",
        accelerator: "CmdOrCtrl+O",
        click: options.openROMDialog.show
      }, {
        label: "Open Battery File...",
        accelerator: "CmdOrCtrl+B",
        click: options.openBatteryFileDialog.show
      }, {
        label: "Save Battery File",
        accelerator: "CmdOrCtrl+S",
        click: options.saveBatteryFile
      }]
    },
    {
      label: "View",
      submenu: [{
          label: "Pixelated",
          type: "checkbox",
          checked: true,
          click: options.togglePixelation
        }, {
          role: "reload"
        },
        {
          type: "separator"
        },
        {
          role: "toggledevtools"
        }
      ]
    },
    {
      label: "Gamepads",
      submenu: [{
        label: "Mapping",
        submenu: gamepadMappingMenu
      }]
    }
  ];

  if (isMacOS()) {
    menu.unshift({
      label: app.getName(),
      submenu: [{
          label: "About",
          click() {
            shell.openExternal("https://github.com/ardean/jsGBC");
          }
        },
        {
          label: "View License",
          click() {
            shell.openExternal(
              "https://github.com/ardean/jsGBC/blob/master/LICENSE"
            );
          }
        },
        {
          type: "separator"
        },
        {
          label: "Relaunch",
          accelerator: "Alt+CmdOrCtrl+R",
          click() {
            app.relaunch();
            app.exit(0);
          }
        },
        {
          role: "quit"
        }
      ]
    });
  }

  return menu;
};

function isOSX() {
  return process.platform === "darwin";
}

function isWindows() {
  return process.platform === "win32";
}

function isLinux() {
  return process.platform === "linux";
}

function isProduction() {
  return process.env.ELECTRON_ENV !== "development";
}

function isDevelopment() {
  return process.env.ELECTRON_ENV === "development";
}

module.exports = {
  isOSX,
  isWindows,
  isLinux,
  isProduction,
  isDevelopment
};

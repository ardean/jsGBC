const ELECTRON_ENV = (process.env.ELECTRON_ENV || "").trim();

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
  return ELECTRON_ENV !== "development";
}

function isDevelopment() {
  return ELECTRON_ENV === "development";
}

module.exports = {
  isOSX,
  isWindows,
  isLinux,
  isProduction,
  isDevelopment
};

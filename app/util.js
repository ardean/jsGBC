const ELECTRON_ENV = (process.env.ELECTRON_ENV || "").trim();

function isMacOS() {
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
  isMacOS,
  isWindows,
  isLinux,
  isProduction,
  isDevelopment
};

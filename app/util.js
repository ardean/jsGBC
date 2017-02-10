function isOSX() {
  return process.platform === "darwin";
}

function isWindows() {
  return process.platform === "win32";
}

function isLinux() {
  return process.platform === "linux";
}

module.exports = {
  isOSX,
  isWindows,
  isLinux
};

const gulp = require("gulp");

let buildTask = "build-darwin";
if (process.platform === "win32") {
  buildTask = "build-win";
}

gulp.task("build", [buildTask]);
gulp.task("build-darwin", ["build-webcomponents", "build-css-darwin"]);
gulp.task("build-win", ["build-webcomponents", "build-css-win"]);

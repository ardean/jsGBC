const gulp = require("gulp");

let devTask = "dev-darwin";
if (process.platform === "win32") {
  devTask = "dev-win";
}

gulp.task("dev", [devTask]);
gulp.task("dev-darwin", ["build-css-dev-darwin", "build-html-dev"]);
gulp.task("dev-win", ["build-css-dev-win", "build-html-dev"]);

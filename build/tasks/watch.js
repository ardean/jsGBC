var gulp = require("gulp");
var browserSync = require("browser-sync");
var paths = require("../paths");

function reportChange(event) {
  console.log("File " + event.path + " was " + event.type + ", running tasks...");
}

gulp.task("watch", ["serve"], function () {
  gulp.watch(["./**/*.js"], {
    cwd: paths.root
  }, ["build-js", browserSync.reload]).on("change", reportChange);
  gulp.watch(paths.html, ["build-html", browserSync.reload]).on("change", reportChange);
  gulp.watch(paths.css, ["build-css"]).on("change", reportChange);
});

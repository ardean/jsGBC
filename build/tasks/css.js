const gulp = require("gulp");
const concat = require("gulp-concat");

const cssFiles = ["src/index.css"];

gulp.task("build-css-darwin", () => {
  return buildCss("darwin", "app/dist");
});

gulp.task("build-css-win", () => {
  return buildCss("win", "app/dist");
});

gulp.task("build-css-dev-darwin", () => {
  return buildCss("darwin", "./");
});

gulp.task("build-css-dev-win", () => {
  return buildCss("win", "./");
});

function buildCss(platform, output) {
  const files = cssFiles.concat();

  if (platform === "darwin") {
    files.push("src/darwin.css");
  }

  return gulp.src(files)
    .pipe(concat("index.css"))
    .pipe(gulp.dest(output));
}

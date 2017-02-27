const gulp = require("gulp");

gulp.task("build-css", () => {
  return gulp.src("src/index.css").pipe(gulp.dest("app/dist"));
});

gulp.task("build-css-dev", () => {
  return gulp.src("src/index.css").pipe(gulp.dest("./"));
});
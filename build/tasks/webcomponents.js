const gulp = require("gulp");
const vulcanize = require("gulp-vulcanize");

gulp.task("build-webcomponents", ["build-html"], () => {
  return gulp
    .src("index.html")
    .pipe(
      vulcanize({
        stripComments: true
      })
    )
    .pipe(gulp.dest("app/dist"));
});
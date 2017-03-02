const gulp = require("gulp");
const inject = require("gulp-inject");

gulp.task("build-html", () => buildHtml("prod"));
gulp.task("build-html-dev", () => buildHtml("dev"));

function buildHtml(env) {
  return gulp
    .src("src/index.html")
    .pipe(
      inject(gulp.src([`./partials/require-${env}.html`]), {
        relative: true,
        removeTags: true,
        transform: (filePath, file) => {
          return file.contents.toString("utf8");
        }
      })
    )
    .pipe(gulp.dest("./"));
}

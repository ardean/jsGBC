var gulp = require("gulp");
var concat = require("gulp-concat");
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var browserify = require("browserify");
var runSequence = require("run-sequence");
var source = require("vinyl-source-stream");
var paths = require("../paths");

gulp.task("build-js", function () {
  return browserify(paths.source, {
      debug: true,
      basedir: paths.root
    })
    .transform("babelify", {
      presets: ["es2015-loose"]
    })
    .bundle()
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(paths.output));
});

gulp.task("build-html", function () {
  return gulp.src("./src/**/*.html")
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulp.dest(paths.output));
});

gulp.task("build-css", function () {
  return gulp.src("./src/**/*.css")
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest(paths.output));
});

gulp.task("build", function (callback) {
  return runSequence(
    "clean", ["build-js", "build-css", "build-html"],
    callback
  );
});

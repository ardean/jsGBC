var gulp = require("gulp");
var browserSync = require("browser-sync");
var paths = require("../paths");

gulp.task("serve", ["build"], function (done) {
  browserSync({
    online: false,
    open: false,
    ui: false,
    port: 9000,
    notify: false,
    ghostMode: false,
    server: {
      baseDir: [paths.output],
      middleware: function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
      }
    }
  }, done);
});

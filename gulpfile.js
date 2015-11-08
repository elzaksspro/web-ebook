var gulp = require("gulp");
var livereload = require("gulp-livereload");

gulp.task('default', function () {
  livereload.listen();
  var watchFiles = ['./db.json', 'index.ejs', 'package.json', 'app.js'];
  gulp.watch(watchFiles).on('change', function (event) {
    if (event.path.indexOf('app.js') !== -1) {
      setTimeout(function () {
        livereload.reload();
      }, 2000);
    } else {
      livereload.reload();
    }
  });
});
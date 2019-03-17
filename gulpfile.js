var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('src/css/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function(){
  gulp.watch('src/css/**/*.scss', ['sass']); 
});

gulp.task('copyjquery', function() {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('public/js/vendor'))
});

gulp.task('copymustache', function() {
  return gulp.src('node_modules/mustache/mustache.min.js')
  .pipe(gulp.dest('public/js/vendor'))
});

gulp.task('build', [`copymustache`, `copyjquery`], function() {
  console.log('building...');
});
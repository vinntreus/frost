var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['lint', 'test']);

gulp.task('test', function(){
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('lint', function(){
  return gulp.src('lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('develop', function(){
  gulp.watch(['test/*.js', 'lib/*.js'], ['default']);
});
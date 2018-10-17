



var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var del = require('del');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var ejs = require('gulp-ejs');



gulp.task('css', ['clean:css'], function() {

});

gulp.task('js', ['clean:js'], function() {

});

gulp.task('ejs', function() {

});

gulp.task('html', function() {

});

gulp.task('serve', function() {

});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['ejs', 'js', 'sass'], function() {

});

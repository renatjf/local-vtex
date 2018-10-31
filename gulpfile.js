'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  injectSvg = require('gulp-inject-svg'),
  webpack = require('webpack-stream'),
  browserSync = require('browser-sync');

  
sass.compiler = require('node-sass');

//sass
gulp.task('sass', function () {
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./pagina/css'));
});


//imagemin
gulp.task('img', function () {
  return gulp.src('./assets/img/**/*.{gif,jpg,png,svg}')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true,
    }))

    .pipe(gulp.dest('./pagina/img/'));

});

//svg
gulp.task('svg', function () {

  return gulp.src('*.html')
    .pipe(injectSvg())
    .pipe(gulp.dest('./'));

});


//browser-sync
gulp.task('browser-sync', function () {
  browserSync.init(['./pagina/css/**', './**'], {
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
});

//gulp-webpack
gulp.task('webpack-stream', function () {
  return gulp.src('./assets/components/script.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./pagina/js/'))
  browserSync.reload();
});


//view
gulp.task('dev', ['sass', 'webpack-stream', 'img', 'svg', 'browser-sync'], function () {
  gulp.watch('./assets/img/**/*.{gif,jpg,png,svg}', ['img']);
  gulp.watch('*.html', ['svg']);
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch('./components/**/*.js', ['webpack-stream']);

});
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglifyjs = require('gulp-uglifyjs'),
    autoprefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browsersync = require('browser-sync');

/*
 gulp.task() - новая задача
 gulp.src() - выбор файла
 gulp.dest - сохранить преобразованные файлы
 */

gulp.task('test', function () {
    console.log('галп работает')
});

gulp.task('default', ['test', 'html'], function () {
    console.log('галп работает по умолчанию')
});

let config = {
    app: './app',
    dist: './dist',
};

gulp.task('html', function () {
    gulp.src([config.app + '/html/index.html'])
        .pipe(gulp.dest(config.dist));

});
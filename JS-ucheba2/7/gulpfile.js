let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglifyJs = require('gulp-uglifyjs'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browsersync = require('browser-sync'),
    babel = require('gulp-babel');

/*
 gulp.task() - новая задача
 gulp.src() - выбор файла
 gulp.dest - сохранить преобразованные файлы
 gulp.watch() - отслеживание изменений в файлах
 */

gulp.task('test', function () {
    console.log('галп работает')
});

let config = {
    app: './app',
    dist: './dist',
};

let path = {
    dist: {
        html: 'dist/',
        js: 'dist/js',
        css: 'dist/js',
        babeljs: 'dist/babel',

    },

}


let pump = require('pump');

gulp.task('html', function () {
    gulp.src([config.app + '/html/index.html'])
        .pipe(gulp.dest(config.dist))
        .pipe(browsersync.reload({stream: true}));

});

gulp.task('sass', function () {
    gulp.src(config.app + '/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(browsersync.reload({stream: true}));
});

gulp.task('babel', function () {
    gulp.src(config.app + '/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(config.app + '/babel'))
        .pipe(browsersync.reload({stream: true}));

});

gulp.task('compress', function () {
    gulp.src(config.app + '/babel/**/*.js')
        .pipe(uglifyJs())
        .pipe(gulp.dest(config.dist + '/js'))
        .pipe(browsersync.reload({stream: true}));
});

gulp.task('myWatch', function () {
   gulp.watch(config.app + '/scss/**/*.scss', ['sass']);
   gulp.watch(config.app + '/html/**/*.html', ['html']);
   gulp.watch(config.app + '/babel/**/*.js', ['compress']);
   gulp.watch(config.app + '/js/**/*.js', ['babel'])

});


/**
 * сервер
 */

gulp.task('server', function () {
   browsersync({
       server: {
           baseDir: config.dist

       }
   });

});

gulp.task('default', ['test', 'html', 'sass', 'babel', 'compress', 'myWatch', 'server'], function () {
    console.log('галп работает по умолчанию')
});
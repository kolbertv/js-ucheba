"use strict";

let gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    babel = require('gulp-babel'),
    gbminify = require('gulp-babel-minify'),
    gutil = require('gulp-util');


let path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        json: 'build/json/'
    },

    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        json: 'src/json/**/*.json',

    },

    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        json: 'src/json/**/*.json',
    },

    clean: './build',

};

let serverConfig = {
    server: {
        baseDir: "./build"
    },

    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(babel().on('error', function (err) {
            let message = err.message;
            let errName = err.name;
            let codeFrame = err.codeFrame;
            gutil.log(gutil.colors.red.bold('JavaScript ОШИБКА: ' + errName));
            gutil.log(gutil.colors.red.bold(message));
            gutil.log(gutil.colors.red.bold(codeFrame));
            this.emit('end');
            }))
        // .pipe(gbminify()) // для минимификации включить
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', function (error) {
            let fileName = error.file;
            let message = error.messageOriginal;
            let line = error.line;
            let column = error.column;
            gutil.log(gutil.colors.red.bold('SCSS ОШИБКА в строке: ' + line + ' столбец:' + column));
            gutil.log(gutil.colors.red.bold(fileName));
            gutil.log(gutil.colors.red.bold(message));
        }))
        .pipe(prefixer())
        // .pipe(cssmin())  // для минимификации включить
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('json:build', function () {
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json))
        .pipe(reload({stream: true}));
});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'json:build'
]);

gulp.task('watch', function () {
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.img, ['image:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
    gulp.watch(path.watch.json, ['json:build']);
});


gulp.task('webserver', function () {
    browserSync(serverConfig);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
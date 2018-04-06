"use strict";

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglifyJs = require('gulp-uglifyjs'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    babel = require('gulp-babel'),
    reload = browserSync.reload,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-clean-css');

let path = {
    app: {
        html: 'app/*.html',
        scss: 'app/scss/*.scss',
        sass: 'app/sass/*.sass',
        css: 'app/css/*.css',
        js: 'app/js/*.js',
        babel: 'app/babel/*.js',
        img: 'app/img/*.*',
        fonts: 'app/fonts/*.*',
    },

    dist: {
        html: 'dist/',
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/img',
        fonts: 'dist/fonts',
        babel: 'app/babel',
    },

    watch: {
        html: 'app/**/*.html',
        scss: 'app/**/*.scss',
        css: 'app/**/*.css',
        sass: 'app/**/*.sass',
        js: 'app/**/*.js',
        babel: 'app/babel/*.js',
    },

    prod: {
        html: 'prod/',
        img: 'prod/img',
    }

};

let serverConfig = {
    server: {
        baseDir: "./dist"
    },
};

// gulp.task('build', ['html', 'sass', 'babel', 'compress', 'concat']);
gulp.task('build', ['html', 'sass', 'babel', 'img']);

gulp.task('default', ['build', 'myWatch', 'server'], function () {
    console.log('галп работает по умолчанию')
});


gulp.task('prodaction', ['prod', 'img-prod'], function () {
    console.log('Финальная сборка для продакшена')
});
    gulp.task('prod', function () {
        return gulp.src(path.dist.html + '*.html')
            .pipe(useref())
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', minifyCss()))
            .pipe(gulp.dest('./prod'));

    });

gulp.task('img-prod', function () {
    gulp.src('./app/img/*.*')
        .pipe(gulp.dest(path.prod.img))
        .pipe(reload({stream: true}));
});


gulp.task('html', function () {
    gulp.src(path.app.html)
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream: true}));

});

gulp.task('sass', function () {
    gulp.src(path.app.scss)
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});


gulp.task('babel', function () {
    gulp.src(path.app.js)
        .pipe(babel())
        // .pipe(uglifyJs())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true}));
});

gulp.task('img', function () {
    gulp.src(path.app.img)
        .pipe(gulp.dest(path.dist.img))
        .pipe(reload({stream: true}));
});


gulp.task('myWatch', function () {
    gulp.watch(path.watch.scss, ['sass']);
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.babel, ['compress']);
    gulp.watch(path.watch.js, ['babel']);

});

gulp.task('server', function () {
    browserSync(serverConfig);
});


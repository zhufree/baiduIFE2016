var gulp = require('gulp'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    gulpUtil = require('gulp-util'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    combiner = require('stream-combiner2');

gulp.task('styles', function(event){
    gulp.src('project-2/task29/*.less')
        // .pipe(less())
        // .pipe(gulp.dest('./project-2'))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(cleancss())
        // .pipe(gulp.dest('./project-2'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('project-2/task29/*.html')
        .pipe(connect.reload());
});

gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js'], cb);
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    })
});

gulp.task('watch', ['html','styles'], function() {
    gulp.watch('project-2/task29/*.less', ['styles']);
    gulp.watch('project-2/task29/*.html', ['html']);
    combined.on('error', console.error.bind(console));
});

gulp.task('default', ['connect', 'watch']);

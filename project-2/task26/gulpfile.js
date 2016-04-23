var gulp = require('gulp'),
    less = require('gulp-less');
    livereload = require('gulp-livereload');
 
gulp.task('testLess', function () {
    gulp.src('task26.less')
        .pipe(less())
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});
 
gulp.task('testWatch', function () {
	livereload.listen();
    gulp.watch('*.less', ['testLess']); //当所有less文件发生改变时，调用testLess任务
});
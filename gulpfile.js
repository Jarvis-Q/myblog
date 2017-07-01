var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    minifyCSS =  require('gulp-minify-css');

var DIR = {
    less: ['public/stylesheets/**/*.less', '!public/stylesheets/common/*.less'],
    js: 'public/javascripts/*.js'
};


gulp.task('less-build', function() {
    gulp.src(DIR.less)
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('js-build', function() {
    gulp.src(DIR.js)
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('default',[
    'less-build',
    'js-build'
]);
const gulp = require('gulp');
const strip = require('gulp-strip-comments');
const rename= require('gulp-rename');
const clean = require('gulp-clean');


gulp.task('clean-css', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

gulp.task('css-dev', function () {
    return gulp.src('src/all.css')
        .pipe(rename({suffix: '.dev'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('css-prod', function () {
    return gulp.src('src/all.css')
        .pipe(strip.text({
            ignore: /url\([\w\s:\/=\-\+;,]*\)/g,
            trim: true
        }))
        .pipe(rename({basename: 'all.prod.min'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['clean-css', 'css-dev', 'css-prod']);

var gulp  = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp.src('test/**/test_*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});
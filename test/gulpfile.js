var gulp = require('gulp')
var gulpJsFreeze = require('../index')

gulp.task('test', function () {
    return gulp.src('fixtures/**/*.js')
        .pipe(gulpJsFreeze({
            freezeMapBaseDir: './fixtures',
            freezeNestingLevel: 0
        }))
        .pipe(gulp.dest('./dest'))
        .pipe(gulpJsFreeze.freezeMapResolve())
        .pipe(gulp.dest('./dest'))
})
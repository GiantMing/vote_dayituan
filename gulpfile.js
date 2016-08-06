const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('es6', () => {
    return gulp.src('routes_src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./routes/'));
});

gulp.task('default', () => {
    return gulp.watch('routes_src/*.js', ['es6'])
});
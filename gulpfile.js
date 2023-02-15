const { src, dest, task, series } = require('gulp')
const rm = require('gulp-rm')

task('clean', () => {
	return src('dist/**/*', {read: false}).pipe(rm())
})

task('copy', series('clean',  () => {
	return src('src/**/*.scss').pipe(dest('dist'))
}))
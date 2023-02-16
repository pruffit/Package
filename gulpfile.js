const { src, dest, task, series } = require('gulp')
const rm = require('gulp-rm')
const sass = require('gulp-sass')(require('node-sass'))

task('clean', () => {
	return src('dist/**/*', {read: false}).pipe(rm())
})

task('copy', () => {
	return src('src/**/*.scss').pipe(dest('dist'))
})

task('styles', () => {
	return src('src/styles/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(dest('dist'))
})

task ('default', series('clean', 'styles'))
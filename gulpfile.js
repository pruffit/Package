const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
 
task('clean', () => {
 	return src('dist/**/*', { read: false })
   	.pipe(rm())
})
 
task('copy', () => {
 	return src('src/styles/*.scss').pipe(dest('dist'));
})
 
task('styles', () => {
 	return src(['node_modules/normalize.css/normalize.css', 'src/styles/main.scss'])
   	.pipe(concat('main.scss'))
   	.pipe(sass().on('error', sass.logError))
   	.pipe(dest('dist'));
});
 
watch('./src/styles/**/*.scss', series('styles'))

task('default', series('clean', 'styles'));
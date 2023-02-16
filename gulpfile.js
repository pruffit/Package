const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprafixer = require('gulp-autoprefixer');
 
task('clean', () => {
 	return src('dist/**/*', { read: false })
   	.pipe(rm());
});
 
task('copy:html', () => {
 	return src('src/*.html').pipe(dest('dist')).pipe(reload({stream: true}));
});
 
task('styles', () => {
 	return src(['node_modules/normalize.css/normalize.css', 'src/styles/main.scss'])
   	.pipe(concat('main.scss'))
		.pipe(sassGlob())
   	.pipe(sass().on('error', sass.logError))
		.pipe(autoprafixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
   	.pipe(dest('dist'));
});

task('server', () => {
	browserSync.init({
		server: {
			baseDir: './dist'
		},
		open: false
	});
});
 
watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));

task('default', series('clean', 'copy:html', 'styles', 'server'));
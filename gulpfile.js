const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprafixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
 
task('clean', () => {
 	return src('dist/**/*', { read: false })
   	.pipe(rm());
});
 
task('copy:html', () => {
 	return src('src/*.html')
		.pipe(dest('dist'))
		.pipe(reload({stream: true}));
});
 
task('styles', () => {
 	return src(['node_modules/normalize.css/normalize.css', 'src/styles/main.scss'])
		.pipe(sourcemaps.init())
   	.pipe(concat('main.min.scss'))
		.pipe(sassGlob())
   	.pipe(sass().on('error', sass.logError))
		.pipe(autoprafixer({cascade: false}))
		.pipe(gcmq())
		.pipe(cleanCss())
		.pipe(sourcemaps.write())
   	.pipe(dest('dist'))
		.pipe(reload({stream: true}));
});

task('scripts', () => {
	return src("src/scripts/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js', {newLine: ';'}))
		.pipe(babel({presets: ["@babel/preset-env"]}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
   	.pipe(dest('dist'))
		.pipe(reload({stream: true}));
});

task('icons', () => {
	return src('src/images/icons/*.svg')
		.pipe(svgo({plugins: [{removeAttrs: {attrs: '(fill|stroke|style|width|height|data.*)'}}]}))
		.pipe(svgSprite({mode: {symbol: {sprite: '../sprite.svg'}}}))
		.pipe(dest('dist/images/icons'));
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
watch('./src/scripts/**/*.js', series('scripts'));
watch('./src/images/icons/*.svg', series('icons'));

task('default', series('clean', 'copy:html', 'styles', 'scripts', 'icons', 'server'));
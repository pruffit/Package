const { src, dest } = require('gulp')

function copy() {
	return src('src/styles/main.scss').pipe(dest('dist'))
}

exports.copy = copy
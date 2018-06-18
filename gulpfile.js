var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('pack-js', function () {	
	return gulp.src(['public/css/*.css'])
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('public/css'));
});
 
gulp.task('pack-css', function () {	
	return gulp.src(['public/js/*.js'])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('public/js'));
});
 
gulp.task('default', ['pack-js', 'pack-css']);
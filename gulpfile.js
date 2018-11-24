const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('serve', function(cb) {

    browserSync.init({
        server: "."
        // or
        // proxy: 'yourserver.dev'
    });

    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.js").on('change', browserSync.reload);
    gulp.watch("src/js/app/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/app/*.js").on('change', browserSync.reload);
	cb();
});

gulp.task('default',function(cb){
	cb();
});

gulp.task('default', gulp.series('serve'));

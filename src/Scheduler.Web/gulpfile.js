var gulp = require('gulp');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('restore', function () {
    gulp.src([
        './node_modules/angular2-in-memory-web-api/*.js',
        './node_modules/systemjs/dist/*.js',
        './node_modules/zone.js/dist/*.js',
        './node_modules/core-js/client/*.js',
        './node_modules/reflect-metadata/reflect.js',
        './node_modules/jquery/dist/*.js',
        './node_modules/bootstrap/dist/**/*.*',
        './node_modules/moment/moment.js'
    ]).pipe(gulp.dest('./wwwroot/libs'));


    gulp.src([
    './node_modules/atoa/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/atoa'));

    gulp.src([
    './node_modules/custom-event/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/custom-event'));

    gulp.src([
    './node_modules/ticky/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/ticky'));

    gulp.src([
    './node_modules/contra/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/contra'));

    gulp.src([
    './node_modules/crossvent/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/crossvent'));

    gulp.src([
    './node_modules/ng2-dragula/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/ng2-dragula'));

    gulp.src([
    './node_modules/dragula/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/dragula'));


    gulp.src([
    './node_modules/rxjs/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/rxjs'));

    gulp.src([
    './node_modules/@angular/**/*.js',
    ]).pipe(gulp.dest('./wwwroot/libs/@angular'));

    gulp.src([
    './node_modules/font-awesome/**/*.css',
    ]).pipe(gulp.dest('./wwwroot/libs/font-awesome'));

    gulp.src([
    './node_modules/font-awesome/fonts/*.*',
    ]).pipe(gulp.dest('./wwwroot/libs/font-awesome/fonts'));

});
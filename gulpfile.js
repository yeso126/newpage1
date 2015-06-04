var gulp =    require('gulp');
var stylus =  require('gulp-stylus');
var plumber = require('gulp-plumber');
var coffee =  require('gulp-coffee');
var jade =    require('gulp-jade');
var browserSync = require('browser-sync');


//Preprocessors

gulp.task('precss', function () {
  gulp.src('./src/stylus/estilos.styl')
  	.pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function(){
  gulp.src('./src/jade/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./public'))
});

gulp.task('coffee', function() {
  gulp.src('./src/coffeescript/*.coffee')
  	.pipe(plumber())
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public",
            index: "index.html"
        }
    });
});

// Watch task

gulp.task('watch', function(){
	gulp.watch('./src/stylus/estilos.styl',['precss'])
	gulp.watch('./src/coffeescript/*.coffee',['coffee'])
  gulp.watch('./src/jade/*.jade',['jade'])
});

//Default task

gulp.task('default',['watch', 'precss','coffee','jade','browser-sync']);

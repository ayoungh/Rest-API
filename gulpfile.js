var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  gulpMocha = require('gulp-mocha');

gulp.task('default', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 4000
    },
    ignore: ['./node_modules']
  })
  .on('restart', function () {
    console.log('Rest API Server RESTARTING');
  });
});

gulp.task('test', function () {
  gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}));
});

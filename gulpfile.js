var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

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

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babel from 'babelify';
import fs from 'fs';

gulp.task('default', ['transpile']);

gulp.task('transpile', () => {

  let bundler = browserify({
    entries: ['./src/app.js'],  // main js file and files want to bundle
    debug: true,
    extensions: [' ', 'js', 'jsx']
  })
    // sets the preset to transpile to es2015 (can also define a .babelrc instead)
    .transform(babel.configure({
      presets: ['es2015']
    }));

  bundler.bundle()
    // error handling
    .on('error', function (error) {
      console.error(`\nError: ${error.message}\n`);
      this.emit('end');
    })

    // bundle source file
    .pipe(source('bundle.js'))
    .pipe(buffer())

    // create sourcemap before running edit commands so we know which file to reference
    .pipe(sourcemaps.init({loadMaps: true}))

    // minify file
    // .pipe(uglify())
    // .pipe(rename('bundle-min.js'))

    // sourcemap gets written and references wherever wourceRoot is specified to be
    .pipe(sourcemaps.write('./', {sourceRoot: './src'}))
    .pipe(gulp.dest('./dist'));

  // return browserify({debug: true})
  //           .transform('babelify')
  //           .require('src/app.js', {entry: true})
  //           .bundle()
  //           .on('error', function (error) {
  //             console.error(`\nError: ${error.message}\n`);
  //             this.emit('end');
  //           })
  //           .pipe(fs.createWriteStream('dist/bundle.js'));

  // return browserify({debug: true})
  //           .transform('babelify')
  //           .require('src/app.js', {entry: true})
  //           .bundle()
  //           .on('error', function (error) {
  //             console.error(`\nError: ${error.message}\n`);
  //             this.emit('end');
  //           })
  //           .pipe(source('bundle.js'))
  //           .pipe(gulp.dest('dist'));

});

gulp.task('watch', ['transpile'], () => {
  gulp.watch('src/**/*', ['transpile']);
});

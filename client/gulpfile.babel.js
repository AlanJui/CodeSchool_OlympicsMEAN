import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import fs from "fs";

gulp.task("default", ["transpile"]);

gulp.task("transpile", () => {

  return browserify({debug: true})
            .transform('babelify')
            .require('src/app.js', {entry: true})
            .bundle()
            .on('error', function (error) {
              console.error(`\nError: ${error.message}\n`);
              this.emit('end');
            })
            .pipe(fs.createWriteStream('dist/bundle.js'));

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

  // return browserify("src/app.js")
  //   .transform("babelify")
  //   .bundle()
  //   .on("error", function(error){
  //     console.error( "\nError: ", error.message, "\n");
  //     this.emit("end");
  //   })
  //   .pipe(source("bundle.js"))
  //   .pipe(gulp.dest("dist"));

});



gulp.task("watch", ["transpile"], () => {
  gulp.watch("src/**/*", ["transpile"]);
});

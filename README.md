gulp-gss
========
Compiles .gss files into AST JSON for running with the [GSS engine](http://gridstylesheets.org/).

## Usage Example
Compile all GSS rule files into a single AST JSON file to be run with the GSS engine

### gulpfile.js
```js
var gss = require('gulp-gss');
var concat = require('gulp-concat');

gulp.task('gss', function () {
  gulp.src('./src/gss/**/*.gss')
    .pipe(gss())
    .pipe(concat('gss.json'))
    .pipe(gulp.dest('./public/gss'));
});
```
### HTML
```html
<!-- gss -->
<link rel="stylesheet" type="text/gss-ast" href="gss/gss.json">
```

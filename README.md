# gulp-js-freezer

> JS resources freezer. The best use for cache invalidation.

## What it does

###### Source CSS files

```
app-script.js
subdir/subdir-script.js
```

###### Freezed files

```
79f2ced21645cb7800b13c899aa09177ff5cad96.js
347770f808e05d90280d6dac1723d3e6f37db08e.js
js-freeze-map.json
```

###### Freezing map file

```json
{
 "app-script.js": "../dest/79f2ced21645cb7800b13c899aa09177ff5cad96.js",
 "subdir/subdir-script.js": "../dest/347770f808e05d90280d6dac1723d3e6f37db08e.js"
}
```

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i gulp-css-freezer --save-dev
```

## Usage

```js
var gulpJsFreezer = require('gulp-js-freezer');

var deployPath = '../_deploy'

gulp.task('freeze-js', function () {
    return gulp.src('../static/js/**/*.js')
        .pipe(gulpJsFreeze({freezeMapBaseDir: '../static/js'}))
        .pipe(gulp.dest(deployPath)) // writes freezed resources
        .pipe(gulpJsFreezer.freezeMapResolve()) // creates map of freezed resources
        .pipe(gulp.dest(deployPath)) // writes freeze map file
})

```

##### Options

```js
var gulpJsFreezer = require('gulp-js-freezer');

var deployPath = '../_deploy'

gulp.task('freeze-js', function () {
    return gulp.src('../static/js/*.js')
        .pipe(gulpJsFreezer({
            freezeMapBaseDir: '../static/js', // resolve paths inside map file name by freezeMapBaseDir.
                                               // default null (writes absolute path of freezed file)
            freezeNestingLevel: 3, // nesting levels of directories; default 1
            freezeMapFileName: 'js-freeze-map.json' // freeze map file name; default js-freeze-map.json
        }))
        .pipe(gulp.dest(deployPath))
        .pipe(gulpJsFreezer.freezeMapResolve())
        .pipe(gulp.dest(deployPath))
})

```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/radist2s/gulp-js-freezer/issues).

## Author

**Alex Batalov**

+ [github/radist2s](https://github.com/radist2s)

Inspired by [borschik](https://github.com/bem/borschik).

## License
Copyright © 2015 [Alex Batalov](http://tagart.ru)
Licensed under the MIT license.
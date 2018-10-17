
const fs = require('fs');
const gulp = require('gulp');
const webpack = require('webpack');
const chalk = require('chalk');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const __if = require('gulp-if');
const ejs = require('gulp-ejs');
const argv = require('yargs').argv;
const browsersync = require('browser-sync').create();
const webpackConfig = require('./webpack.config.js');

const browserlist = ['> 0.25%', 'last 5 versions'];
const production = !!(argv.production);


const PATHS = {
  css: {
    scss: 'src/scss/**/*.scss',
    output: 'build/assets/css',
    watch: 'build/assets/css/*.css'
  }, 
  js: {
    entry: 'src/js/index.js',
    output: 'build/assets/js',
    filename: 'app.bundle.js'
  },
  html: {
    src: 'src/views/pages/*.ejs',
    output: 'build',
    watch: 'src/views/**/*.ejs',
    reload: 'build/*.html'
  } 
},
WEBPACK_CONFIG = webpackConfig({ browserlist, production }, PATHS),
SITE_DATA = fs.readFileSync('src/js/data/data.json', 'utf8');



// Tasks ---------------------------//

gulp.task('serve', () => {
  if (production) return false;
  browsersync.init({
    server: PATHS.html.output,
    files: PATHS.css.watch,
    ghostMode: false
  }, (err, bs) => {});
});


gulp.task('scss', () => {
  return gulp.src(PATHS.css.scss)
    .pipe(__if(!production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: production ? 'compressed' : 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: browserlist
    }))
    .pipe(__if(!production, sourcemaps.write('./')))
    .pipe(gulp.dest(PATHS.css.output));
});


gulp.task('webpack', () => {
  const compiler = webpack(WEBPACK_CONFIG);
  const callback = (err, stats) => {
    if (err) {
      console.log(chalk`[WEBPACK-ERROR] ${err}`);
    } else {
      console.log(chalk`[WEBPACK] ${stats.toString({chunks: false})}`);
      if (!production) browsersync.reload();
    }
  };
  return production ? compiler.run(callback) : compiler.watch({}, callback);
});


gulp.task('html', () => {
  return gulp.src(PATHS.html.src)
    .pipe(ejs(SITE_DATA, {}, {ext: '.html'}))
    .pipe(gulp.dest(PATHS.html.output));
});


gulp.task('default', ['html', 'scss', 'webpack', 'serve'], () => {
  if (production) return false;

  gulp.watch(PATHS.css.scss, ['scss']);
  gulp.watch(PATHS.html.watch, ['html']);
  gulp.watch(PATHS.html.reload, () => browsersync.reload());
});
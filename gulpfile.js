const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('sass-compile', function() {
  return gulp.src('./stylesSCSS/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./stylesCSS'))
})

gulp.task('watch', function() {
  gulp.watch('./stylesSCSS/**/*.scss', gulp.series('sass-compile'))
})

const svgSpriteConfig = {
  shape: {
      dimension: {
          maxWidth: 500,
          maxHeight: 500
      },
      spacing: {
          padding: 0
      }
  },
  mode: {
      symbol: {
          dest : '.'
      }
  }
};

gulp.task('svgSprite', function () {
  return gulp.src('./images/icons/*.svg')
      .pipe(svgSprite(svgSpriteConfig))
      .pipe(gulp.dest('sprite'));
});

gulp.task("images", function() {
  return gulp.src("./images/*.{png,jpg}")
    .pipe(imagemin([
        pngquant(),
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({progressive: true})
      ]))
    .pipe(gulp.dest("./imagesmin"));
});
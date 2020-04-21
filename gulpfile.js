
const gulp = require('gulp');


// CSS / SASS plugins
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-clean-css');

// JSS / plugins
const uglify = require('gulp-terser-js');

// Utility plugins
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');


// Images plugins
const imagemin = require('gulp-imagemin');


// Project Variables

const style_src = 'src/sass/main.scss';
const style_dest = 'build/assets/css/';
const style_watch = 'src/sass/**/*.scss';


const script_src = 'src/js/**/*.js';
const script_dest = 'build/assets/js/';

const img_src = 'src/img/**/*.{jpg,png,svg}';
const img_dest = 'build/assets/img/';




// --------------------------------------------
// Tasks
// --------------------------------------------

gulp.task('sass', () => {

    return gulp.src( style_src )

        .pipe(sourcemaps.init())

            .pipe(plumber())

            .pipe(sass().on('error', sass.logError))

            .pipe(autoprefixer({cascade: false}))

            .pipe(minifycss({compatibility: 'ie8'}))

            .pipe(rename({
                basename: 'main',
                suffix: '.min'
            }))

        .pipe(sourcemaps.write('./'))

        .pipe( gulp.dest( style_dest )); 
})





gulp.task('js', () => {

    return gulp.src(script_src)

        .pipe(sourcemaps.write())

            .pipe(plumber())

            .pipe(concat('app.js'))

            .pipe(uglify({
                mangle: {
                toplevel: true
                }
            }))

            .pipe(rename({
                basename: 'app',
                suffix: '.min'
            }))

        .pipe(sourcemaps.write('./'))

        .pipe( gulp.dest(script_dest)); 
})

gulp.task('img', () => {

    return gulp.src(img_src)

        .pipe(imagemin())

        .pipe(rename({
            suffix: '.min'
        }))

        .pipe( gulp.dest(img_dest)); 
})


gulp.task('default', () =>{

    gulp.watch(style_watch, gulp.series('sass'))

    gulp.watch(script_src, gulp.series('js'))

    gulp.watch(img_src, gulp.series('img'))

})








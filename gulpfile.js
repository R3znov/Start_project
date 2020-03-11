
let gulp = require('gulp');


// CSS / SASS plugins
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let minifycss = require('gulp-clean-css');

// JSS / plugins
let uglify = require('gulp-uglify');

// Utility plugins
let concat = require('gulp-concat');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');
let rename = require('gulp-rename');


// Images plugins
// let images = require('gulp-imagemin');


// Project Variables

let style_src = 'src/sass/main.scss';
let style_dest = 'build/assets/css/';
let style_watch = 'src/sass/**/*.scss';


// let script_src = 'src/js/**/*.js';
// let script_dest = 'build/assets/js/';




// --------------------------------------------
// Tasks
// --------------------------------------------



function css(done) {
    gulp.src( style_src )

        .pipe(plumber())

        .pipe( sass({
            OutputStyle: 'compressed'
        }))

        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))

        .pipe( gulp.dest( style_dest ));  

    done(); 
};


// function js (done) {
//     gulp.src(script_src)
//         .pipe(plumber())
//         .pipe(concat('app.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest( script_dest ));
//     done();
// };


gulp.task('css', css);

// gulp.task('js', js);



function watch() {
   
    gulp.watch(style_watch, css);

    // gulp.watch(script_src, js);

};

gulp.task('watch', watch);





const bowerFiles     = require('main-bower-files');
const bowerFilesGlob = '**/*.css';
const gulp           = require('gulp');
const sass           = require('gulp-sass');
const concat         = require('gulp-concat');
const autoprefixer   = require('gulp-autoprefixer');
const cleanCSS       = require('gulp-clean-css');
const rename         = require('gulp-rename');
const rev            = require('gulp-rev');

function buildCSS (src, destination) {
    return gulp
        .src(src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixer({
            browsers : ['last 2 versions'],
            cascade  : false
        })))
        .pipe(gulp.dest(destination));
}

function buildVendorCSS (destination) {
    return gulp
        .src(bowerFiles(bowerFilesGlob))
        .pipe(gulp.dest(destination));
}

function buildCSSProd (src, destination) {
    return gulp
        .src(src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixer({
            browsers : ['last 2 versions'],
            cascade  : false
        })))
        .pipe(cleanCSS({compatibility : 'ie8'}))
        .pipe(rename(function pathMap (path) {
            path.extname = '.min' + path.extname;
        }))
        .pipe(rev())
        .pipe(gulp.dest(destination));
}

function buildVendorCSSProd (filename, destination) {
    return gulp
        .src(bowerFiles(bowerFilesGlob))
        .pipe(concat(filename))
        .pipe(cleanCSS({compatibility : 'ie8'}))
        .pipe(rev())
        .pipe(gulp.dest(destination));
}

module.exports = {
    buildCSS           : buildCSS,
    buildCSSProd       : buildCSSProd,
    buildVendorCSS     : buildVendorCSS,
    buildVendorCSSProd : buildVendorCSSProd
};

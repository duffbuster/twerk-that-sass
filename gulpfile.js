const gulp            = require('gulp');
const livereload      = require('gulp-livereload');
const sharedGulpTasks = require('./gulpTasks');
const runSequence     = require('run-sequence').use(gulp);
const config          = require('./server/config');
const winston         = require('winston');
const _               = require('lodash');
const serverScript    = __dirname + '/index.js';
const nsp             = require('gulp-nsp');

gulp.task('cleanBuilt', function cleanBuilt () {
    sharedGulpTasks.cleanBuilt(config.assets.BUILD_PATH);
});

gulp.task('scss:dev', function scssDev () {
    sharedGulpTasks.scss.buildCSS(config.assets.client.src.scss, config.assets.client.destination.css);
});

gulp.task('vendorcss:dev', function scssDev () {
    sharedGulpTasks.scss.buildVendorCSS(config.assets.client.destination.css);
});

gulp.task('scss:prod', function scssProd () {
    sharedGulpTasks.scss.buildCSSProd(config.assets.client.src.scss, config.assets.client.destination.css);
});

gulp.task('vendorcss:prod', function scssDev () {
    sharedGulpTasks.scss.buildVendorCSSProd('vendor.min.css', config.assets.client.destination.css);
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', sharedGulpTasks.setEnv.setDev);

// Set NODE_ENV to 'test'
gulp.task('env:stage', sharedGulpTasks.setEnv.setStage);

// Set NODE_ENV to 'production'
gulp.task('env:prod', sharedGulpTasks.setEnv.setProd);

gulp.task('nodemon', function nodemon () {
    var watch = _.union(config.assets.server.views, config.assets.server.src);

    sharedGulpTasks.nodemon(serverScript, watch)
        .on('restart', function onRestart () {
            winston.info('[nodemon] restarted dev server');
        });
});

gulp.task('nsp', function nspShared (done) {
    nsp({package : __dirname + '/package.json'}, done);
});

gulp.task('watch', function watch () {
    livereload.listen({start : true});

    gulp.watch(config.assets.client.src.scss, ['scss:dev'])
        .on('change', livereload);
});

// Run the project in development mode
gulp.task('default', function runDefault (done) {
    runSequence('env:dev', 'cleanBuilt', 'scss:dev', 'vendorcss:dev', ['nodemon', 'watch'], done);
});

// Run the project in development mode
gulp.task('prod', function runProd (done) {
    runSequence('env:prod', 'cleanBuilt', 'scss:prod', 'vendorcss:prod', ['nodemon'], done);
});

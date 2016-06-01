/// <binding BeforeBuild='clean' AfterBuild='build-spa' />
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge = require('merge');
var del = require('del');
var path = require('path');
var gutil = require('gulp-util');

var dist = "./wwwroot/"

// Define paths
var paths = {
    npm: 'node_modules/',
    bower: './bower_components/',
    distCss: dist + 'spa/css',
    distSpa: dist + 'spa/',
    jsVendors: dist + 'lib/js',
    cssVendors: dist + 'lib/css',
    imgVendors: dist + 'lib/img',
    fontsVendors: dist + 'lib/fonts',
    srcAppSpa: './app/spa/',
    srcAppCss: './app/css/'
};

var config = {
    //Include all js files but exclude any min.js files
    src: ['app/**/*.js','!app/**/*.min.js']
}


/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
    del([dist], cb);
});

// Copy all script, css style sheets, images to output path
gulp.task('setup-vendors', function () {
    gulp.src([
      paths.bower + 'angular/angular.min*.js',
      paths.bower + 'angular/angular.min*.js.map',
      paths.bower + 'angular-route/angular-route.min*.js',
      paths.bower + 'angular-route/angular-route.min*.js.map',
      paths.bower + 'angular-resource/angular-resource.min.*js',
      paths.bower + 'angular-resource/angular-resource.min.*js.map',
      paths.bower + 'jquery/dist/jquery.min*.js',
      paths.bower + 'angular-local-storage/dist/angular-local-storage.min*.js',
      paths.bower + 'angular-local-storage/dist/angular-local-storage.min*.js.map',
      paths.bower + 'bootstrap/dist/js/bootstrap.min*.js*',
    ]).pipe(gulp.dest(paths.jsVendors));

    gulp.src([
       paths.bower + 'bootstrap/dist/css/bootstrap.min*.css',
       paths.bower + 'fontawesome/css/font-awesome.min*.css'
    ]).pipe(gulp.dest(paths.cssVendors));

    gulp.src([
       paths.srcAppCss + '/*.css'
    ]).pipe(gulp.dest(paths.distCss));

    gulp.src([
      paths.bower + 'fontawesome/fonts/FontAwesome.otf',
      paths.bower + 'fontawesome/fonts/fontawesome-webfont.eot',
      paths.bower + 'fontawesome/fonts/fontawesome-webfont.svg',
      paths.bower + 'fontawesome/fonts/fontawesome-webfont.ttf',
      paths.bower + 'fontawesome/fonts/fontawesome-webfont.woff',
      paths.bower + 'fontawesome/fonts/fontawesome-webfont.woff2',
    ]).pipe(gulp.dest(paths.fontsVendors));
});

// Minify all javascript files
gulp.task('uglify-app', function () {
    //return gulp.src([paths.srcAppSpa + '*.js',paths.srcAppSpa + '/**/*.js'])
    // .pipe(uglify())
    // .pipe(concat('app.min.js'))
    // .pipe(gulp.dest(paths.dist));

    return gulp.src(config.src)
     // .pipe(uglify()).on('error', errorHandler)
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest(paths.distSpa));
});

// Copy all script, css style sheets, images to output path
gulp.task('setup-spa-app', ['uglify-app'], function () {
    gutil.log('Copying from = ' + paths.srcAppSpa + '/**/*.html' + ' to ' + paths.distSpa);
    // Copy all html files
    gulp.src([paths.srcAppSpa + '/**/*.html']).pipe(gulp.dest(paths.distSpa)); //, paths.srcAppSpa + '/*.html'

    // Copy minified javascript files
    gulp.src(['./app/index.html']).pipe(gulp.dest(dist));
    // Copy minified javascript files
    //gulp.src([paths.srcAppSpa + 'app.min.js']).pipe(gulp.dest(paths.distSpa));
});


// Combine and minify all files from the app folder
// This tasks depends on the clean task which means gulp will ensure that the all.
// Clean task is completed before running the scripts task.
gulp.task('build-spa', ['clean', 'setup-vendors', 'setup-spa-app'], function () {

    //return gulp.src(config.src)
    //  .pipe(uglify()).on('error', errorHandler)
    //  .pipe(concat('app.min.js'))
    //  .pipe(gulp.dest(dist));
});

gulp.task('watch', function () {
    return gulp.watch(config.src, ['build-spa']);
});

// Handle the error
function errorHandler(error) {
    gutil.log('Error = ' + error.toString());
    this.emit('end');
}
/**
 * Created by yanndeungoue on 31/03/2016.
 */
"use strict";

var KarmaServer     = require("karma").Server;
var gulp            = require("gulp");
var $               = require("gulp-load-plugins")();
var browserify      = require("browserify");
var watchify        = require("watchify");
var babelify        = require("babelify");
var hbsfy           = require("hbsfy");
var source          = require("vinyl-source-stream");
var buffer          = require("vinyl-buffer");
var browserSync     = require("browser-sync");
var csso            = require("gulp-csso");
var reload = browserSync.reload;

// Bundle files with browserify
gulp.task("browserify", function () {
    // set up the browserify instance on a task basis
    var bundler = browserify({
        entries: "public/app/src/App.js",
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [babelify, hbsfy]
    });

    bundler = watchify(bundler);

    var rebundle = function() {
        return bundler.bundle()
            .on("error", $.util.log)
            .pipe(source("App.js"))
            .pipe(buffer())
            .pipe($.sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .on("error", $.util.log)
            .pipe($.sourcemaps.write("./"))
            .pipe(gulp.dest(".tmp/src"));
    }

    bundler.on("update", rebundle);

    return rebundle(); 
});

// Bundle files with browserify for production
gulp.task("browserify:dist", function () {
    // set up the browserify instance on a task basis
    var bundler = browserify({
        entries: "public/app/src/App.js",
        // defining transforms here will avoid crashing your stream
        transform: [babelify, hbsfy]
    });

    return bundler.bundle()
        .on("error", $.util.log)
        .pipe(source("App.js"))
        .pipe(buffer())
        .pipe($.uglify())
        .pipe(gulp.dest("public/dist/src"));
});

// Lint Javascript
gulp.task("lint", function () {
    return gulp.src([
            "public/app/src/**/*.js",
            "!public/app/src/config.js",
            "!public/app/src/vendor/**/*.js"
        ])
        .pipe(reload({stream: true, once: true}))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

// Optimize images
gulp.task("images", function () {
    return gulp.src("public/app/asset/**/*")
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest("public/dist/asset"))
        .pipe($.size({title: "images"}));
});

// Copy web fonts to dist
gulp.task("fonts", function () {
    return gulp.src([
            "public/app/{,styles/}fonts/**/*",
            "node_modules/bootstrap/dist/fonts/**/*",
            "node_modules/font-awesome/fonts/**/*"
        ])
        .pipe($.flatten())
        .pipe(gulp.dest("public/dist/fonts"));
});

// Compile and automatically prefix stylesheets
gulp.task("styles", function () {
    return gulp.src([
        "public/app/styles/main.css",
        "node_modules/bootstrap/dist/css/bootstrap.css",
        "node_modules/font-awesome/css/font-awesome.css"])
        .pipe($.sourcemaps.init())
        .pipe($.postcss([
            require("autoprefixer")({browsers: ["last 1 version"]})
        ]))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(".tmp/styles"))
        .pipe(reload({ stream: true }));
});

// Scan your HTML for assets & optimize them
gulp.task("html", ["styles"], function () {
    return gulp.src("public/app/*.html")
        .pipe($.htmlReplace())
        .pipe($.useref())
        .pipe($.if("*.css", csso()))
        .pipe($.if("*.html", $.minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest("public/dist"));
});

// Clean output directory and cached images
gulp.task("clean", function (callback) {
    var del = require("del")
    del([".tmp", "public/dist"], function () {
        $.cache.clearAll(callback);
    });
});

// Copy assets to distribution path
gulp.task("extras", function () {
    return gulp.src([
        "public/app/*.*",
        "!public/app/*.html"
    ], {
        dot: true
    }).pipe(gulp.dest("public/dist"));
});

// Run karma for development, will watch and reload
gulp.task("tdd", function(callback) {
    var karma = new KarmaServer({
        configFile: __dirname + "/karma.conf.js"
    }, callback);

    karma.start();
});

// Run tests and report for ci
gulp.task("test", function(callback) {
    var karma = new KarmaServer({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true,
        browsers: ["PhantomJS"],
        reporters: ["dots", "junit"],
        junitReporter: {
            outputFile: ".tmp/test-results.xml"
        }
    }, callback);

    karma.start();
});

// Run development server environmnet
gulp.task("serve", ["styles", "browserify"], function () {
    browserSync({
        notify: false,
        port: 9000,
        ui: {
            port: 9001
        },
        server: {
            baseDir: [".tmp", "public/app"],
            routes: {
                "/node_modules": "node_modules"
            }
        },
        browser: "google chrome"
    });

    // watch for changes
    gulp.watch([
        "public/app/*.html",
        "public/app/src/**/*.js",
        "public/app/asset/**/*",
        ".tmp/src/**/*.js"
    ]).on("change", reload);

    gulp.watch("public/app/styles/**/*.css", ["styles"]);
});

// Run web server on distribution files
gulp.task("serve:dist", function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ["public/dist"],
            routes: {
                "/node_modules": "node_modules"
            }
        }
    });
});

// Build the project for distribution
gulp.task("build", ["lint", "browserify:dist", "html", "images", "fonts", "extras"], function () {
    var size = $.size({title: "build", gzip: true })
    return gulp.src("public/dist/**/*")
        .pipe(size)
        .pipe($.notify({
            onLast: true,
            title: "Build complete",
            message: function() {
                return "Total scripts size (gzip) " + size.prettySize;
            }
        }));
});

// Clean all and build from scratch
gulp.task("default", ["clean"], function () {
    gulp.start("build");
});

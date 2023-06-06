import webpack from "webpack-stream";

export const js = () =>{
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plagins.plumber(
        app.plagins.notify.onError({
            title: "JS",
            messageL: "Error: <%= error.message %>"
        })
    ))
    .pipe(webpack({
        mode: app.isBuild ? 'production' : 'development',
        output: {
            filename: 'app.min.js',
        }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plagins.browsersync.stream());
}
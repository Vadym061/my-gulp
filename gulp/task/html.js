import fileInclude from "gulp-file-include";
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from "gulp-version-number";

export const html = () =>{
    return app.gulp.src(app.path.src.html)
    .pipe(app.plagins.plumber(
        app.plagins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(fileInclude())
    .pipe(app.plagins.replace(/@img\//g, "img/"))
    .pipe(
        app.plagins.if(
            app.isBuild,
            webpHtmlNosvg()
        )
    )
    .pipe(
        app.plagins.if(
            app.isBuild,
        versionNumber({
        'value': '%DT%',
        'append': {
            'key': '_v',
            'cover': 0,
            'to': [
                'css',
                'js'
            ]
        },
        'output': {
            'file': 'gulp/version.json'
        }
    })))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plagins.browsersync.stream());
}
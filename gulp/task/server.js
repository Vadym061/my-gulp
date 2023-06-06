export const server = (done) => {
    app.plagins.browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notlify: false,
        port: 3000,
    })
}
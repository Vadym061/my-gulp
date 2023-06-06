import { deleteAsync } from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
  deleteAsync(`./${app.path.rootFloder}.zip`);
  return app.gulp.src(`${app.path.buildFloder}/**/*.*`, {})
    .pipe(app.plagins.plumber(
        app.plagins.notify.onError({
          title: "ZIP",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(zipPlugin(`${app.path.rootFloder}.zip`))
    .pipe(app.gulp.dest("./"));
};

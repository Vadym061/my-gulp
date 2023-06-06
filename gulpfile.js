//Основний модуль
import gulp from 'gulp';

// Імпорт шляхів
import { path } from './gulp/config/path.js';

// Імпорт загальних плагінів
import { plagins } from './gulp/config/plugins.js';

// Передаємо значення в глобальну зміну
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plagins: plagins
}

// Імпорт задач
import { copy } from './gulp/task/copy.js';
import { reset } from './gulp/task/reset.js';
import { html } from './gulp/task/html.js';
import { server } from './gulp/task/server.js';
import { scss } from './gulp/task/scss.js';
import { js } from './gulp/task/js.js';
import { images } from './gulp/task/images.js';
import { otfTotf, ttfToWoff, fontStyle } from "./gulp/task/fonts.js";
import { svgSprive } from "./gulp/task/svgSprive.js";
import { zip } from "./gulp/task/zip.js";


// Спостерігач за корегуванням в файлах
function watcher(){
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive }

const fonts = gulp.series(otfTotf, ttfToWoff, fontStyle);

const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Виконання задач
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZIP = gulp.series(reset, mainTask, zip);

export {dev}
export {build}
export {deployZIP}

// Виконання сценарія за замовчуванням
gulp.task('default', dev);
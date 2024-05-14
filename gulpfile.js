
    let preprocessor = 'sass'; 

    const { src, dest, parallel, series, watch } = require('gulp');
    const browserSync = require('browser-sync').create();
    const concat = require('gulp-concat');
    const uglify = require('gulp-uglify-es').default;
    const sass = require('gulp-sass')(require('sass'));
    const autoprefixer = require('gulp-autoprefixer');
    const cleancss = require('gulp-clean-css');
  
    // WEBP IINIT

    let webp = null; 

    async function convertWebp() {

      if (!webp) {
        const gulpWebpModule = await import('gulp-webp');
        webp = gulpWebpModule.default;
      }
      return src('app/img/*.{jpg,jpeg,png}')
        .pipe(webp())
        .pipe(dest('app/img/'))
        .pipe(browserSync.stream());
    }

    // COMPRESS IMG INIT

    let imagemin = null;

    async function minifyImages() {

      if (!imagemin) {
        const gulpImageminModule = await import('gulp-imagemin');
        imagemin = gulpImageminModule.default;
      }
      return src('app/img/*.{jpg,jpeg,png}')
        .pipe(imagemin())
        .pipe(dest('app/img/'))
        .pipe(browserSync.stream());
    }

    // gulp minifyImages

    // SCRIPTS INIT

    function scripts() {
        return src([ 
            'app/libs/jquery/dist/jquery.min.js',
            'app/libs/slick-carousel/slick/slick.min.js',
            ])
        .pipe(concat('scripts.min.js')) 
        .pipe(uglify()) 
        .pipe(dest('app/js/')) 
        .pipe(browserSync.stream()) 
    }
     
    function styles() {
        return src('app/' + preprocessor + '/main.' + preprocessor + '')
        .pipe(eval(preprocessor)()) 
        .pipe(concat('main.min.css')) 
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) 
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) 
        .pipe(dest('app/css/')) 
        .pipe(browserSync.stream()) 
    }


     
    function startwatch() {
        browserSync.init({ 
            server: {
                baseDir: "app/"
            }
        })
        watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
        watch('app/**/' + preprocessor + '/**/*', styles);
        // watch('app/img/*.{jpg,jpeg,png}', convertWebp);
        watch(['app/*.html']).on('change', browserSync.reload);
     
    }


    // exports.browsersync = browsersync;
    exports.styles = styles;
    exports.scripts = scripts;
    exports.startwatch = startwatch;
    exports.convertWebp = convertWebp;
    exports.minifyImages = minifyImages;

    // Экспортируем дефолтный таск с нужным набором функций
    exports.default = parallel(scripts, styles, startwatch);


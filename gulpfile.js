var gulp=require('gulp'),
	concat=require('gulp-concat'),//合并js文件
	uglify=require('gulp-uglify'),//压缩js
	rename=require('gulp-rename'),//重命名
	minifyCSS=require('gulp-minify-css'),//压缩css
	imagemin=require('gulp-imagemin'),//压缩图片
	pngquant = require('imagemin-pngquant'),//深度压缩图片
	sass = require('gulp-ruby-sass'), //sass的编译
	autoprefixer = require('gulp-autoprefixer'),//自动添加css前缀
	jshint = require('gulp-jshint'),//js代码校验
	notify = require('gulp-notify'),//更改提醒
	cache = require('gulp-cache'),//图片缓存，只有图片替换了才压缩
	livereload = require('gulp-livereload'),//自动刷新页面
	browserSync = require('browser-sync').create(),//自动刷新
	reload      = browserSync.reload;
	del = require('del');//删除目录



// 使用 JSHint, concat 和 minify 处理 JavaScript
gulp.task('script',function(){
	return gulp.src('src/js/*.js')
			//js代码校验
			.pipe(jshint())
		    .pipe(jshint.reporter('default'))
		    //js代码合并
			.pipe(concat('index.js'))
			.pipe(gulp.dest('dist/js')) 
			//压缩js
			.pipe(uglify())	
			//给文件添加.min后缀
			.pipe(rename('index.min.js'))
			//输出压缩文件到指定目录
			.pipe(gulp.dest('dist/js')) 
			//提醒任务完成
			.pipe(notify({ message: 'gulp-script任务完成' }))
});


// 编译Sass,minify
gulp.task('sass', function() {
  return sass('src/scss/*.scss').on('error', sass.logError) //编译sass
    // gulp.src('src/scss/*.scss')
  	// .pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
  	// 保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest('dist/css')) 
    //添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //给文件添加.min后缀
    .pipe(rename({suffix: '.min'}))
    //压缩样式文件
    .pipe(minifyCSS())
    //实时更新
    // .pipe(reload({stream: true}));
    //输出压缩文件到指定目录
    .pipe(gulp.dest('dist/css'));
});

//css压缩
gulp.task('css',function(){
	return gulp.src('src/css/**/*.css')
			.pipe(minifyCSS())
			.pipe(gulp.dest('dist/css'))
})

// 增加css前缀 autoprefixer 
gulp.task('autoprefixer',function(){
	return gulp.src('dist/css/*.css')
			.pipe(autoprefixer({
				browsers:['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
		    	cascade: true, //是否美化属性值 默认：true 像这样：
		            //-webkit-transform: rotate(45deg);
		            //        transform: rotate(45deg);
		    	remove:true //是否去掉不必要的前缀 默认：true 
			}))
			.pipe(gulp.dest('dist/css'));
})

//images图片压缩
gulp.task('images',function(){
	return gulp.src('src/images/*')
			.pipe(cache(imagemin({ 
				optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
				progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
				interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
				multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
				svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
				use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
			})))
    		.pipe(gulp.dest('dist/images'))
})

//html文件
gulp.task('html',function(){
	return gulp.src('src/*.html')
			.pipe(gulp.dest('dist'))
})

//将相关项目文件复制到build 文件夹下
gulp.task('copy', function() {
	//html 文件
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
    //js文件
   gulp.src('src/js/libs/*.js')
  		.pipe(gulp.dest('dist/js/libs'))
  	//font文件以及目录
  	gulp.src('src/font/**/*.*')
  		.pipe(gulp.dest('dist/font'))
});


//清除目标文件
gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

//Watch 和 LiveReload
//我们可以使用 Watch 来监听指定文件和 LiveReload 设置实现自动刷新。
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/css/*.scss', ['sass']);
  // Watch .js files
  gulp.watch('src/js/*.js', ['script']);
  // Watch image files
  gulp.watch('src/images', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/*']).on('change', livereload.changed);
});


// 静态服务器 + 监听 scss/html 文件
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch('src/**/*.*',['default']);
    gulp.watch("dist/*.html").on('change', reload);
});

// 代理
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });




gulp.task('default',['copy','html','sass', 'css' ,'script', 'images'],function(){
	console.log('gulp所有任务完成')
})
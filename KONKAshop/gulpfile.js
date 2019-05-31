//发布任务
const gulp = require("gulp");

/*
	静态资源，所有不需要你编写代码的，预先要准备好的，叫做静态资源
	.html 图片  数据  .js
*/
gulp.task("copy-html", function(){
	return gulp.src("index.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

/*
	拷贝图片
*/
gulp.task("images", function(){
	return gulp.src( "images/*.{jpg,png}")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

/*
	数据
*/
gulp.task("data", function(){
	return gulp.src(["*.json", "!package.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})

/*
	第三方的.js文件
*/
gulp.task("scripts", function(){
	return gulp.src(["*.js","!gulpfile.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

/*
	.scss
*/
const sass = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("sass", function(){
	return gulp.src("stylesheet/index.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
gulp.task("reset", function(){
	return gulp.src("stylesheet/reset.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("reset.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

/*
	一次性执行多个任务，建立工程
*/
gulp.task("build", ["copy-html", "images", 'data', "scripts", 'sass','reset'], function(){
	console.log("工程建立成功");
})

/*
	实时监听功能
*/
gulp.task("watch", function(){
	gulp.watch("stylesheet/index.scss", ['sass']);
	gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
	gulp.watch(["*.json", "!package.json"], ['data']);
	gulp.watch(["*.{jpg,png}", "images/*.jpg"], ['images']);
	gulp.watch("index.html", ['copy-html']);
})

/*
	编写服务器  gulp-connect 只能启动阿帕奇  不支持php和mysql
*/
const connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root: "dist",
		port: 368,
		livereload: true
	})
})

gulp.task("default", ["watch", "server"]);
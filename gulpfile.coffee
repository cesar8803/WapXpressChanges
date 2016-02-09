gulp = require 'gulp'
stylus = require 'gulp-stylus'
jeet = require 'jeet'
connect = require 'gulp-connect'
jade = require 'gulp-jade'
autoprefixer = require("gulp-autoprefixer")
concat  = require 'gulp-concat'
gutil   = require 'gulp-util'

gulp.task "jade", ->
	gulp.src("dev/jade/*.jade")
	.pipe(jade({ pretty:true}))
	.pipe(gulp.dest("dest/"))
	.pipe(connect.reload())


gulp.task "jadeLiverpool", ->
	gulp.src("dev/jade/liverpool/**/*.jade")
	.pipe(jade({ pretty:true}))
	.pipe(gulp.dest("dest/liverpool/"))
	.pipe(connect.reload())

gulp.task 'stylus', ->
	gulp.src('dev/stylus/*.styl')
		.pipe(stylus(
			use: [jeet()]
		))
		.pipe autoprefixer
			browsers: ["IE 8",'> 5%', 'last 2 versions','Firefox <= 20']
		.pipe(gulp.dest('dest/css'))
		.pipe(connect.reload())


gulp.task 'connect', ->
	connect.server(
		root: ['dest/']
		livereload: true
		port: 6969
	)

gulp.task 'watch', ->
	gulp.watch ['dev/stylus/*.styl'], ['stylus']
	gulp.watch ['dev/jade/*.jade'], ['jade']
	gulp.watch ['dev/jade/liverpool/**/*.jade'], ['jadeLiverpool']

gulp.task 'default', ['jade','jadeLiverpool','stylus', 'connect', 'watch']
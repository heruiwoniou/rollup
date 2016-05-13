var gulp=require('gulp'),
	rollup=require('gulp-rollup'),
	sourcemaps=require('gulp-sourcemaps'),
	clean=require('gulp-clean'),
	babel=require('rollup-plugin-babel');

gulp.task('clean',function(){
	return gulp.src('dist', {read: false})
		.pipe(clean());
})

gulp.task('build',function(){

	gulp.src('src/index.js', {read: false})
	    .pipe(rollup({
	    	format: 'umd',
	    	moduleName:'Cvm',
	        sourceMap: true,
	        plugins:['es2015-rollup']
	    }))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest('dist'));
})

gulp.task('default',['clean'],function(){
	gulp.run('build');

	gulp.watch(['src/**/*.js'],function(){
		gulp.run('build');
	})
})
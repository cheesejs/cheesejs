module.exports = function(grunt) {
	grunt.registerMultiTask("compiletovm", "compiletovm", function(argument) {
		var minify = require('html-minifier').minify;
		for (var target in this.data.files) {
			var source = this.data.files[target];
			var page = grunt.file.read(source);
			var result = minify(page, this.data.options);
			result = result.replace("href=\"css/main.css\"", "href=\"http://static.eqbangcdn.com/hdw/dev/eqbang_shop_web_dev/css/main.css\"");
			result = result.replace("src=\"script/main.js\"", "src=\"http://static.eqbangcdn.com/hdw/dev/eqbang_shop_web_dev/script/main.js\"");
			var write = grunt.file.write(target, result);
			if(write){
				console.log("Compile successful");
			}
		}
	});
}
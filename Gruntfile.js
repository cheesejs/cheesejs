module.exports = function(grunt) {


	require('load-grunt-tasks')(grunt);
	grunt.loadTasks("tasks");

	grunt.initConfig({
		html2js: {
			options: {
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				},
				existingModule: true,
				singleModule: true,
				module: "app",
				base: "src/script/templates-html",
				amd: true,
				amdPrefixString: "define(['../app'],function(){",
				amdSuffixString: "});",
				rename: function(moduleName) {
					return moduleName.replace('.html', '');
				}
			},
			all: {
				src: ["src/script/templates-html/**/*.html"],
				dest: "src/script/template/template.js",
			},
		},
		buildscript: {
			dist: {
				dest: "dist/script/main.js",
				main: "src/script/main",
			},
			production: {
				dest: "production/script/main.js",
				main: "src/script/main",
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					"dist/index.html": "src/index.html"
				}
			},
		},
		compiletovm: {
			server: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					"server/goods.vm": "src/index.html",
				}
			}
		},
		jshint: {
			src: ["src/script/**/*.js"],
			dist: ["dist/script/*.js"],
			disttpl: ["src/script/template/*js"]
		},
		less: {
			development: {
				options: {
					yuicompress: true
				},
				files: [{
					expand: true,
					cwd: './src/less',
					src: ['**/main.less'],
					dest: './src/css',
					ext: '.css'
				}]
			}
		},
		autoprefixer: {
			target: {
				src: "./src/css/**/*.css"
			}
		},
		cssmin: {
			dist: {
				files: [{
					expand: true,
					cwd: './src/css',
					src: ['**/*.css'],
					dest: './dist/css',
					ext: '.css'
				}]
			},
			production: {
				files: [{
					expand: true,
					cwd: './src/css',
					src: ['**/*.css'],
					dest: './production/css',
					ext: '.css'
				}]
			}
		},
		watch: {
			scripts: {
				files: ["src/script/*.js", "src/script/**/*.js"],
				tasks: ["jshint:src", "buildscript:dist"],
				options: {
					spawn: false,
					debounceDelay: 250,
				},
			},
			html: {
				files: ["src/**/*.html"],
				tasks: ["htmlmin:dist", "compiletovm"],
				options: {
					spawn: false,
					debounceDelay: 250,
				}
			},
			template: {
				files: ["src/script/templates-html/**/*.html"],
				tasks: ["html2js", "jshint:disttpl", "buildscript:dist"],
				options: {
					spawn: false,
					debounceDelay: 250,
				}
			},
			less: {
				files: ["src/less/**/**.less"],
				tasks: ["less", "autoprefixer", "cssmin:dist"],
				options: {
					spawn: false,
					debounceDelay: 250,
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: ["dist"]
				}
			}
		}
	});

	grunt.registerTask("dev", ["html2js", "jshint:disttpl", "jshint:src", "buildscript:dist", "htmlmin", "compiletovm", "less", "autoprefixer", "cssmin:dist"]);
	grunt.registerTask("production", ["html2js", "jshint:disttpl", "jshint:src", "buildscript:production", "htmlmin", "compiletovm", "less", "autoprefixer", "cssmin:production"]);

	grunt.registerTask("default", ["dev", "connect", "watch"]);

};
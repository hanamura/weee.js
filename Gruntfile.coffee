module.exports = (grunt) ->
	pkg = grunt.file.readJSON 'package.json'

	grunt.initConfig
		pkg: pkg

		concat:
			dist:
				src: [
					'src/**/weee-*.coffee'
					'src/export.coffee'
				]
				dest: '<%= pkg.name %>.js'
			pkgd:
				src: [
					'src/pkgd.license.js'
					'node_modules/eventemitter2/lib/eventemitter2.js'
					'<%= pkg.name %>.js'
				]
				dest: '<%= pkg.name %>.pkgd.js'

		coffee:
			dist:
				src: '<%= pkg.name %>.js'
				dest: '<%= pkg.name %>.js'

		uglify:
			dist:
				src: '<%= pkg.name %>.js'
				dest: '<%= pkg.name %>.min.js'
			pkgd:
				src: '<%= pkg.name %>.pkgd.js'
				dest: '<%= pkg.name %>.pkgd.min.js'

		mocha:
			test:
				src: 'test/**/*.html'
				options:
					run: true
					reporter: 'Spec'

		watch:
			code:
				files: 'src/**/*'
				tasks: 'build'
			test:
				files: 'test/**/*'
				tasks: 'test'
			bower:
				files: 'package.json'
				tasks: 'bower'

	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-mocha'
	grunt.registerTask 'build', [
		'concat:dist'
		'coffee:dist'
		'uglify:dist'
		'concat:pkgd'
		'uglify:pkgd'
	]
	grunt.registerTask 'default', [
		'build'
		'mocha:test'
		'bower'
	]
	grunt.registerTask 'test', [
		'concat:dist'
		'coffee:dist'
		'mocha:test'
	]
	grunt.registerTask 'bower', ->
		json = JSON.stringify
			name: pkg.name
			description: pkg.description
			version: pkg.version
			main: pkg.main
			license: pkg.license
			ignore: ['test']
			dependencies: pkg.dependencies
		, null, '  '
		json += '\n'
		grunt.file.write 'bower.json', json
		console.log json

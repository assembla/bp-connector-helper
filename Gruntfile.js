'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env: {
      test: { NODE_ENV: 'test' }
    },

    'jasmine_node': {
      options: {
        projectRoot: './spec',
        verbose: false,
        forceExit: true,
        captureExceptions : true
      },
      all: [ './spec' ]
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'package.json',
        '.jshintrc',
        'lib/**/*.js',
        'spec/**/*.js',
        'expamles/**/*.js',
        '*.js'
      ],

      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test', ['jshint', 'jasmine_node']);
  grunt.registerTask('default', ['test']);
};

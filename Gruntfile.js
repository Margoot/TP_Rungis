module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  //npm install grunt grunt-jscs grunt-contrib-jshint grunt-contrib-watch
  // time-grunt load-grunt-tasks jshint-stylish grunt-execute

  grunt.initConfig({
    watch: {
      js: {
        files: ['app/*.js'],
        tasks: ['jshint:js', 'jscs:js', 'execute:js']
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: true
      },
      js: {
        src: ['app/*.js']
      }
    },
    jscs: {
      js: {
        src: ['app/*.js']
      }
    },
    execute: {
      js: {
        src: ['app/index.js'] // change it by you filename (for the final
                              // program use main or index)
      }
    }
  });

  grunt.registerTask('default',
    ['jshint:js', 'jscs:js', 'execute:js', 'watch']);
};

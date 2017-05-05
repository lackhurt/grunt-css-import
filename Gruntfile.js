/*
 * css-import
 * https://github.com/lackhurt/gruntjs
 *
 * Copyright (c) 2014 lackhurt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        css_import: {
            simple_concat: {
                options: {

                },
                files: {
                    'tmp/simple_concat/all.css': ['test/fixtures/style/all.css']
                }
            },
            file_without_import: {
                options: {

                },
                files: {
                    'tmp/simple_concat/without_import.css': ['test/fixtures/style/without_import.css']
                }
            }
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'css_import', 'nodeunit', 'clean']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};

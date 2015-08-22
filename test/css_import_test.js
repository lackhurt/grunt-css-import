'use strict';

var grunt = require('grunt');

exports.css_import = {
    setUp: function (done) {
        done();
    },
    simple_concat: function(test) {
        var actual = grunt.file.read('tmp/simple_concat/all.css');
        var expected = grunt.file.read('test/expected/simple_concat/all.css');
        test.equal(actual, expected, 'This is a simple concat');

        test.done();
    }
};

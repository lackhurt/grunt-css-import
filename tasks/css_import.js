/*
 * grunt-css-import
 * https://github.com/lackhurt/grunt-css-import
 *
 * Copyright (c) 2014 lackhurt
 * Licensed under the MIT license.
 */

'use strict';
var util = require('./util');

module.exports = function (grunt) {

    grunt.registerMultiTask('css_import', 'Concat the css file by "@import".', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            var concatContent = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var content = grunt.file.read(filepath);
                var relativeExtraCss = util.parseExtraCss(content);

                grunt.log.subhead('Processing file "' + filepath + '" :');

                var extraCssContentArr = relativeExtraCss.map(function(importPath) {
                    if (util.isRelativeUrl(importPath)) {
                        grunt.log.writeln('Found extra relative path file : ' + importPath);
                        return util.replaceExtraResourcesPath(grunt.file.read(util.fetchImportPath(filepath, importPath)), importPath);
                    } else {
                        grunt.log.warn('Found absolute path file : ' + importPath);
                        return '@import "' + importPath + '";';
                    }
                });

                var splitedCssContentArr = util.splitCssFileByImport(content);

                var resultArr = [];
                // 按照src顺序合并文件
                while (Math.max(splitedCssContentArr.length, extraCssContentArr.length)) {
                    resultArr.push(splitedCssContentArr.shift());
                    resultArr.push(extraCssContentArr.shift());
                }

                return resultArr.filter(function(e) {
                    return !!e;
                }).join('\n');
            });

            grunt.file.write(f.dest, concatContent.join('\n'));
            grunt.log.ok('File "' + f.dest + '" created.');
        });
    });
};

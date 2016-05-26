# css-import

> Concat the css file by @import. The relative url of the background image and font face will be changed automatically.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-import --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-import');
```

## The "grunt-css_import" task

### Overview
In your project's Gruntfile, add a section named `css_import` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    css_import: {
        your_target: {
            options: {

            },
            files: {
                'tmp/simple_concat/all.css': ['test/fixtures/style/all.css']
            }
        }
    }
}
});
```

### Options
Default options is OK!

### Usage Examples


In this example, the default options are used to do something with whatever.
So **if** the `all_modules.css` file has the content


    @import "module_a/a.css";
    @import "module_b/b.css";
    @import "../lib/lib.css";

	ul {
	   margin: 0;
	}

**And** dest file is `dest/all.css`
```js
grunt.initConfig({
  css_import: {
    files: {
      'dest/all.css': ['src/module/all_modules.css'],
    },
  },
});
```

**Then** `dest/all.css`

		/** module_a/a.css's content **/
		/** module_b/b.css's content **/
		/** ../lib/lib.css's content **/

		ul {
		   margin: 0;
		}
**The relative url of the background image and font face will be changed automatically.**

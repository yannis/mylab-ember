/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

// var app = new EmberApp();


// Put the bootstrap fonts in the place that the bootstrap css expects to find them.
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var env = EmberApp.env();
var isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

var app = new EmberApp({
  fingerprint: {
    enabled: isProductionLikeBuild,
    prepend: 'https://di1r2b2j5jj7z.cloudfront.net/'
  },
  sourcemaps: {
    enabled: !isProductionLikeBuild,
  },
  minifyCSS: { enabled: isProductionLikeBuild },
  minifyJS: { enabled: isProductionLikeBuild },

  tests: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,
  hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,

  vendorFiles: {
    'handlebars.js': {
      staging:  'bower_components/handlebars/handlebars.runtime.js'
    },
    'ember.js': {
      staging:  'bower_components/ember/ember.prod.js'
    }
  }
});

select2: {
  includeAssets: false
}

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('bower_components/select2/select2.css');
app.import('bower_components/select2/select2-bootstrap.css');

app.import('bower_components/moment/moment.js');
// app.import('bower_components/select2/select2.js');

// app.import('ember-cli-showdown/vendor/showdown/showdown.js');
app.import('vendor/showdown/extensions/table.js');
app.import('vendor/showdown/extensions/github.min.js');

app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');

var select2Images = pickFiles('bower_components/select2', {
  srcDir: '/',
  files: ['**/*.gif', '**/*.png'],
  destDir: '/assets'
});


var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/fonts/bootstrap'
});

module.exports = mergeTrees([app.toTree(), select2Images, bootstrapFonts], {overwrite: true});


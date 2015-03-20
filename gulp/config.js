'use strict';

module.exports = {
  app: {
    temp: '.tmp/',
    dist: 'dist/'
  },

  lint: {
    src: [
      'gulp/{,**/}*.js',
      'lib/{,**/}*.js',
      'sample/{,**/}*.js'
    ]
  },

  scripts: {
    debug: true,
    'bundleConfigs': [
      {
        entries: './lib/index.js',
        extensions: [ ],
        dest: './dist',
        outputName: 'head.bundle.js'
      }
    ]
  }
};
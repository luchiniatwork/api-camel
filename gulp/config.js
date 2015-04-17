'use strict';

module.exports = {
  
  lint: {
    src: [
      'gulp/{,**/}*.js',
      'lib/{,**/}*.js',
      'sample/{,**/}*.js'
    ]
  },

  scripts: {
    debug: true,
    bundleConfigs: [
      {
        src: 'src/lib/**/*.js',
        dest: 'dist/lib',
        minDest: 'dist',
        outputName: 'index.min.js'
      },
      {
        src: 'src/sample_hal2/**/*.js',
        dest: 'dist/sample_hal2',
        minDest: 'dist',
        outputName: 'sample_hal2.min.js'
      }
    ]
  }
};
'use strict';

var BaseEndpoint = require('./lib/base-endpoint').klass();

var TestEndpoint = function() {};
TestEndpoint.prototype = new BaseEndpoint();

var t = new TestEndpoint();

console.log('aqui1');
t.printA();
console.log('aqui2');

module.exports = {
  /**
   * Escape special characters in the given string of html.
   * 
   * @param  {String} html
   * @return {String}
   */
  escape: function(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  /**
   * Unescape special characters in the given string of html.
   *
   * @param  {String} html
   * @return {String}
   */
  unescape: function(html) {
    return String(html)
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, '\'')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
};
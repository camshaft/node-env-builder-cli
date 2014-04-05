/**
 * Module dependencies
 */

var builder = require('env-builder');
var exists = require('fs').existsSync;
var builderFs = require('env-builder-fs');
var builderGithub = require('env-builder-github');

/**
 * Compile an ENV from a source
 *
 * @param {String} source
 * @param {String} env
 * @param {Array} types
 * @param {String} app
 * @param {Object} opts
 * @param {Function} fn
 */

module.exports = function(source, env, types, app, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts;
    opts = {};
  }
  var conf = detect(source, opts);
  if (!conf) return fn(new Error('Invalid source: ' + source));

  builder(env, types, app, conf, fn);
};

function detect(source, opts) {
  if (exists(source)) return builderFs(source, opts);
  // TODO make a hyper adapter
  //if (source.indexOf('http') === 0) return builderHyper(source, opts);
  if (source.split('/').length === 2) return builderGithub(source, opts);
}

'use strict';

var compiler = require('gss-compiler');
var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.exports = function() {

  function transform (file, enc, next) {
    var self = this;
    if (file.isNull()) {
      self.push(file);
      return next();
    }
    if (file.isStream()) {
      self.emit('error', new PluginError('gulp-gss', 'Streaming not supported'));
      return next();
    }
    var str = file.contents.toString('utf8');
    var ast = compiler.compile(str);
    file.contents = new Buffer(JSON.stringify(ast, null, 2) + "\n");
    file.path = gutil.replaceExtension(file.path, '.json');
    self.push(file);
    return next();
  };
  
  return through2.obj(transform);
};

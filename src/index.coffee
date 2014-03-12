'use strict'

compiler = require 'gss-compiler'
through2 = require 'through2'
gutil = require 'gulp-util'
PluginError = gutil.PluginError

module.exports = ->

  transform = (file, enc, next) ->
    self = this

    if file.isNull()
      self.push file # pass along
      return next()

    if file.isStream()
      self.emit 'error', new PluginError('gulp-gss', 'Streaming not supported')
      return next()

    str = file.contents.toString 'utf8'
    ast = compiler.compile str

    file.contents = new Buffer JSON.stringify(ast, null, 2) + "\n"
    file.path = gutil.replaceExtension file.path, '.json'
    self.push file
    next()

  through2.obj(transform)

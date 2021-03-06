const babel = require('babel-core')
const path = require('path')
const fs = require('fs')
const findBabelConfig = require('find-babel-config')
const throwError = require('../throw-error')
const logger = require('../logger')

var defaultBabelOptions = {
  presets: ['es2015'],
  plugins: ['transform-runtime']
}

module.exports = function compileBabel (scriptContent) {
  const { file, config } = findBabelConfig.sync(process.cwd());

  if (!file) {
    logger.info('no .babelrc found, defaulting to default babel options')
  }

  const baseBabelOptions = file ? config : defaultBabelOptions
  const babelOptions = Object.assign({sourceMaps: true}, baseBabelOptions)

  const res =  babel.transform(scriptContent, babelOptions)

  return {
    code: res.code,
    sourceMap: res.map
  }
}

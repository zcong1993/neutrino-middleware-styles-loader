const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoaders = require('./css-loaders')

const MODULES = path.join(__dirname, 'node_modules')
const ENV = process.env.NODE_ENV || 'development'

module.exports = ({ config }, {
  minimize,
  extractCSS,
  sourceMap,
  postcss = {},
  cssModules,
  autoprefixer
} = {}) => {
  postcss.plugins = postcss.plugins || []

  if (autoprefixer !== false) {
    postcss.plugins.unshift(require('autoprefixer')(autoprefixer))
  }

  const cssOptions = {
    minimize,
    extract: extractCSS && ENV === 'production',
    sourceMap: Boolean(sourceMap),
    postcss,
    cssModules
  }

  config
    .resolve
      .modules
        .add(MODULES)
        .end()
      .end()
    .resolveLoader
      .modules
        .add(MODULES)
        .end()
      .end()

  // only use ExtractTextPlugin
  if (extractCSS && ENV === 'production') {
    config.plugin('extract-css')
      .use(ExtractTextPlugin, [{
        filename: '[name].[contenthash:8].css',
        allChunks: true
      }])
  }

  cssLoaders(config, cssOptions)
}

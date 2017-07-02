const { join } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoaders = require('./css-loaders')

const MODULES = join(__dirname, 'node_modules')

module.exports = (neutrino, {
  minimize,
  extractCSS,
  sourceMap,
  postcss = {},
  cssModules,
  autoprefixer
} = {}) => {
  const config = neutrino.config
  postcss.plugins = postcss.plugins || []

  if (autoprefixer !== false) {
    postcss.plugins.unshift(require('autoprefixer')(autoprefixer))
  }

  const cssOptions = {
    minimize,
    extract: extractCSS,
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

  if (extractCSS) {
    // only use ExtractTextPlugin before creating a production build
    neutrino.on('prebuild', () => {
      config.plugin('extract-css')
        .use(ExtractTextPlugin, [{
          filename: '[name].[contenthash:8].css',
          allChunks: true
        }])
    })
  }

  cssLoaders(config, cssOptions)
}

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoaders = require('./css-loaders')

const MODULES = path.join(__dirname, 'node_modules')

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

  // production mode
  neutrino.on('prebuild', () => {
    // only use ExtractTextPlugin before creating a production build
    if (extractCSS) {
      config.plugin('extract-css')
        .use(ExtractTextPlugin, [{
          filename: '[name].[contenthash:8].css',
          allChunks: true
        }])
    }
    cssLoaders(config, cssOptions)
  })

  // dev mode
  neutrino.on('prestart', () => {
    // disable extractCSS
    cssOptions.extract = false
    cssLoaders(config, cssOptions)
  })

  // test mode
  neutrino.on('test', () => {
    // disable extractCSS
    cssOptions.extract = false
    cssLoaders(config, cssOptions)
  })
}

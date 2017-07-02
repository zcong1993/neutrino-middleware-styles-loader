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

  // if (sourceMap !== false) {
  //   if (typeof sourceMap === 'string') {
  //     // using custom sourceMap
  //     config.devtool(sourceMap)
  //   } else {
  //     // using `source-map` in production mode
  //     neutrino.on('prebuild', () => {
  //       config.devtool('source-map')
  //     })
  //     // using `eval-source-map` in dev mode
  //     neutrino.on('prestart', () => {
  //       config.devtool('source-map')
  //     })
  //     // using `inline-source-map` intest mode
  //     neutrino.on('test', () => {
  //       config.devtool('inline-source-map')
  //     })
  //   }
  //   config.output
  //     .devtoolModuleFilenameTemplate(info => path.resolve(info.absoluteResourcePath))
  // }

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

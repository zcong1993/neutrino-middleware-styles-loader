const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoaders = require('./css-loaders')

const ENV = process.env.NODE_ENV || 'development'

module.exports = ({ config }, {
  minimize,
  extractCSS,
  sourceMap,
  postcss = {},
  cssModules,
  autoprefixer,
  externalLoaderOptions = {}
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
    cssModules,
    externalLoaderOptions
  }

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

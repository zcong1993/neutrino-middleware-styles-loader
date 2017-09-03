// fork from https://github.com/egoist/poi/blob/master/packages/poi/lib/css-loaders.js
const HandleCSSLoader = require('webpack-handle-css-loader')

const LANGS = ['css', 'stylus', 'styl', 'sass', 'scss', 'less']

module.exports = function (config, options) {
  // remove default style loader first
  config.module
    .rules
    .delete('style')

  const handleLoader = new HandleCSSLoader(options)

  for (const lang of LANGS) {
    const rule = handleLoader[lang]()
    const context = config.module
      .rule(lang)
      .test(rule.test)
      .include
        .add(filepath => {
          // Not ends with `.module.xxx`
          return !/\.module\.[a-z]+$/.test(filepath)
        })
        .end()

    rule.use.forEach(use => {
      let loaderOptions = use.options
      if (options.externalLoaderOptions[lang]) {
        loaderOptions = Object.assign({}, use.options, options.externalLoaderOptions[lang])
      }
      context
        .use(use.loader)
          .loader(use.loader)
          .options(loaderOptions)
    })
  }

  handleLoader.set('cssModules', true)

  const cssModulesLangs = LANGS.map(lang => [lang, new RegExp(`\\.module\\.${lang}`)])

  for (const cssModulesLang of cssModulesLangs) {
    const [lang, test] = cssModulesLang

    const rule = handleLoader[lang](test)
    const context = config.module
      .rule(`${lang}-module`)
      .test(rule.test)

    rule.use.forEach(use => {
      let loaderOptions = use.options
      if (options.externalLoaderOptions[lang]) {
        loaderOptions = Object.assign({}, use.options, options.externalLoaderOptions[lang])
      }
      context
        .use(use.loader)
          .loader(use.loader)
          .options(loaderOptions)
    })
  }
}

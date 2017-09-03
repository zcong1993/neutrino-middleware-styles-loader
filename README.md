# neutrino-middleware-styles-loader

[![NPM version](https://img.shields.io/npm/v/neutrino-middleware-styles-loader.svg?style=flat)](https://npmjs.com/package/neutrino-middleware-styles-loader) [![NPM downloads](https://img.shields.io/npm/dm/neutrino-middleware-styles-loader.svg?style=flat)](https://npmjs.com/package/neutrino-middleware-styles-loader) [![CircleCI](https://circleci.com/gh/zcong1993/neutrino-middleware-styles-loader/tree/master.svg?style=shield)](https://circleci.com/gh/zcong1993/neutrino-middleware-styles-loader/tree/master)

> `neutrino-middleware-styles-loader` is Neutrino middleware for loading and importing all kinds of stylesheets from modules
>
> fork from [poi](https://github.com/egoist/poi/blob/master/packages/poi/lib/css-loaders.js)

## Features

- Support all kinds of stylesheets: `css`, `stylus`, `styl`, `sass`, `scss`, `less`
- Easy config `minimize`, `extractCSS`, `sourceMap` as out-of-the-box feature
- Support [css modules](https://github.com/css-modules/css-modules)
- Customizing `postcss` and `autoprefixer`
- Customizing loader options support 

## Requirements

- Node.js v6.10+
- Yarn or npm client
- Neutrino v6

## Installation

```bash
# yarn
$ yarn add neutrino-middleware-styles-loader
# npm
$ npm install --save neutrino-middleware-styles-loader
```

## Usage

*Note:* If you want to use one of these `stylus`, `styl`, `sass`, `scss`, `less`, you should install the `loader` by yourself. After install `less-loader` and `less`, you can use `*.less` now.

`neutrino-middleware-styles-loader` can be consumed from the Neutrino API, middleware, or presets. Require this package and plug it into Neutrino:

```js
// Using function middleware format
const styles = require('neutrino-middleware-styles-loader')

// Use with default options
neutrino.use(styles)

// Usage showing default options
neutrino.use(styles, {
  minimize: false,
  extractCSS: false,
  sourceMap: false,
  postcss: {},
  cssModules: false,
  autoprefixer: false,
  externalLoaderOptions: {}
})
```

```js
// Using object or array middleware format

// Use with default options
module.exports = {
  use: ['neutrino-middleware-styles-loader']
}

// Usage showing default options
module.exports = {
  use: [
    ['neutrino-middleware-styles-loader', {
      minimize: false,
      extractCSS: false,
      sourceMap: false,
      postcss: {},
      cssModules: false,
      autoprefixer: false,
      externalLoaderOptions: {}
    }]
  ]
}
```

## Options

This lib using [webpack-handle-css-loader](https://github.com/egoist/webpack-handle-css-loader) create config.

### autoprefixer

Type: `object` `boolean`

Default:
```js
{
  browsers: ['ie > 8', 'last 4 versions']
}
```

Options for [autoprefixer](https://github.com/postcss/autoprefixer), set to `false` to disable it.

### cssModules

Type: `boolean`
Default: `false`

Process CSS using [css modules](https://github.com/css-modules/css-modules).

Files ending with `.module.css` `.module.scss` `.module.less` etc also support CSS modules by default.

To enable CSS modules for all CSS files, set `cssModules: true` in config file.

### extractCSS

Type: `boolean`
Default: `false`

Extract CSS into a single file.

### minimize

Type: `boolean`

Default: `false`

Minimize CSS files.

### sourceMap

Type: `boolean`

Default: `false`

Generate sourcemaps.

*Note:* If you want to use this, set `sourceMap: true`, and you also should set `config.devtool` option.

### postcss

Type: `Array` `object`

If you're using CLI, it searches for custom postcss config file using [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config), and add `autoprefixer` to the top of it when `postcss` is an array or object.

You can use this option to override it if you don't want extra config file for postcss.

### externalLoaderOptions

Type: `Object`

You can add your custom loader options here, for example:

```js
module.exports = {
  use: [
    ['neutrino-middleware-styles-loader', {
      minimize: false,
      extractCSS: false,
      sourceMap: false,
      postcss: {},
      cssModules: false,
      autoprefixer: false,
      externalLoaderOptions: {
        css: {
          localIdentName: '[name]__[local]--[hash:base64:5]'
        },
        less: {
          // some options for less-loader here
        }
      }
    }]
  ]
}
```

## Related

- [neutrino-preset-react-zc](https://github.com/zcong1993/neutrino-preset-react-zc) Neutrino preset that supports building React web applications

- [neutrino-preset-eslint-react](https://github.com/zcong1993/neutrino-preset-eslint-react) Neutrino preset for react project adding xo's base JS ESLint config, following the xo styleguide

- [neutrino-middleware-source-map](https://github.com/zcong1993/neutrino-middleware-source-map) Neutrino middleware for supporting sourceMap

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**neutrino-middleware-styles-loader** © [zcong1993](https://github.com/zcong1993), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by zcong1993 with help from contributors ([list](https://github.com/zcong1993/neutrino-middleware-styles-loader/contributors)).

> [github.com/zcong1993](https://github.com/zcong1993) · GitHub [@zcong1993](https://github.com/zcong1993)

const { Neutrino } = require('neutrino')

const mw = () => require('../')

const options = {
  minimize: true,
  extractCSS: true,
  sourceMap: true
}

test('loads middleware', () => {
  expect(mw).not.toThrow()
})

test('uses middleware', () => {
  const api = new Neutrino()

  expect(() => api.use(mw())).not.toThrow()
})

test('uses with options', () => {
  const api = new Neutrino()

  expect(() => api.use(mw(), options)).not.toThrow()
})

test('instantiates', () => {
  const api = new Neutrino()

  api.use(mw())

  expect(() => api.config.toConfig()).not.toThrow()
})

test('instantiates with options', () => {
  const api = new Neutrino()

  api.use(mw(), options)

  expect(() => api.config.toConfig()).not.toThrow()
})


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
  const api = Neutrino() // eslint-disable-line new-cap

  expect(() => api.use(mw())).not.toThrow()
})

test('uses with options', () => {
  const api = Neutrino() // eslint-disable-line new-cap

  expect(() => api.use(mw(), options)).not.toThrow()
})

test('instantiates', () => {
  const api = Neutrino() // eslint-disable-line new-cap

  api.use(mw())

  expect(() => api.config.toConfig()).not.toThrow()
})

test('instantiates with options', () => {
  const api = Neutrino() // eslint-disable-line new-cap

  api.use(mw(), options)

  expect(() => api.config.toConfig()).not.toThrow()
})


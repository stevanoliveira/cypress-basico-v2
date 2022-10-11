const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  chromeWebSecurity: false,
  env: {},
  e2e: {
    setupNodeEvents(on, config) {},
  },
})

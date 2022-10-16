const appConfig = require('config');

// Or...
// const appConfig = require('dotenv').config();
// const appConfig = require('dotenv/config');

module.exports = {
  plugins: [
    /**
     * Expose environment variables to webpack so they can be used
     * inside the app under `process.env` Object;
     * The defined values below are defaults and can be overwritten externally.
     * For more info, see:
     * https://webpack.js.org/plugins/environment-plugin/
     */
    new webpack.EnvironmentPlugin(appConfig),
  ],
}

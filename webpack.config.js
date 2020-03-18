'use strict'
const path = require('path')

const genConfig = (config, { webpack }) => {
  // add plugins
  config.resolve.alias = {
    '@': path.join(__dirname, '/src')
  };
  // do something else
  return config;
}

module.exports = genConfig;
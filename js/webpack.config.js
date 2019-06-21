const config = require('flarum-webpack-config')();

delete config.module.rules[0].exclude;

module.exports = config;

const config = require('flarum-webpack-config')({
  useExtensions: ['fof-components'],
});

delete config.module.rules[0].exclude;

module.exports = config;

const mainConfig = require("./webpack.main.config");
const rendererConfig = require("./webpack.renderer.config");
const viewConfig = require("./webpack.view.config")

const config = [mainConfig, rendererConfig, viewConfig];

module.exports = config;
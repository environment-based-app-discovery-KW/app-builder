const webpack = require("webpack");
const path = require('path');
const BUILD_DIR = path.join(__dirname, '/dist');

const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: BUILD_DIR,
};

const entry = {};
entry.app = PATHS.src;

module.exports = {
  context: __dirname,
  entry,
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    libraryTarget: "window",
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    })],
};
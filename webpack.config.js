const path = require('path');
const shrinkWrapJson = require('./npm-shrinkwrap.json');
const BUILD_DIR = path.join(__dirname, '/lean-build');

const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: BUILD_DIR,
};

const entry = {};
entry.app = PATHS.src;
const externals = {};

Object.keys(shrinkWrapJson.dependencies).forEach(_ => {
  let ver = shrinkWrapJson.dependencies[_].version;
  let depName = _ + "_" + ver;
  externals[_] = {
    window: ["$deps", depName],
  };
});

module.exports = {
  context: __dirname,
  entry,
  externals,
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    libraryTarget: "window",
  }
};
const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');
const shrinkWrapJson = require('./npm-shrinkwrap.json');
const BUILD_DIR = path.join(__dirname, '/lean-build');

const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: BUILD_DIR,
};

const entry = {};
const externals = {};
const deps = [];

Object.keys(shrinkWrapJson.dependencies).forEach(_ => {
  // 只有在packageJson中出现的dependency才打包
  if (!packageJson.dependencies[_]) {
    return;
  }
  let ver = shrinkWrapJson.dependencies[_].version;
  let depName = _ + "_" + ver;
  entry[depName] = "./node_modules/" + _;
  deps.push(depName);
});

module.exports = {
  context: __dirname,
  entry,
  externals: externals,
  output: {
    path: PATHS.dist,
    filename: 'deps/[name].js',
    library: ['$deps', '[name]'],
  },
};

const meta = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  deps,
};

fs.writeFileSync(path.join(BUILD_DIR, "meta.json"), JSON.stringify(meta, null, 4), { encoding: "UTF8" });
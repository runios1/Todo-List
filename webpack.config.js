const path = require('path');

module.exports = {
  entry: ['./src/projectDOM.js','./src/taskFormDOM.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
};
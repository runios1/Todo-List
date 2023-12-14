const path = require("path");

module.exports = {
  entry: ["./src/projectDOM.js", "./src/taskFormDOM.js", "./src/mainDOM.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist")
    },
    open: true,
  },
  mode: "development",
  devtool: "inline-source-map",
};

const path = require("path");

module.exports = {
  entry: "./client/src/index.js",
  output: {
    path: path.join(__dirname, "./client/public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

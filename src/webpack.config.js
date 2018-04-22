const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const APP_DIR = path.resolve(__dirname, './src/app');
const BUILD_DIR = path.resolve(__dirname, 'public');
const extractSass = new ExtractTextPlugin({
  filename: "scss.css",
  disable: process.env.NODE_ENV === "development"
});
require("babel-polyfill");

const config = {
  entry: ["babel-polyfill", `${APP_DIR}/index.js`],
  output: {
    path: BUILD_DIR,
    sourceMapFilename: "bundle.js.map",
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
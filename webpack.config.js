const webpack = require('webpack');
const path = require('path');

require("babel-polyfill");

module.exports = {
  entry: {
    'public/build/bundle': './src/app/main.jsx'
  },

  output: {
    filename: '[name].js',
    sourceMapFilename: "[name].js.map",
  },
  devtool: 'inline-source-map',
  /*resolve: {
    extensions: [ '.js', '.jsx' ]
  },*/
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query:
          {
            presets: [ "es2015", "stage-0", 'react' ],
            plugins: [ "transform-object-rest-spread", "transform-async-to-generator", "syntax-async-functions", "transform-runtime" ]
          }
      }
    ]
  }
};
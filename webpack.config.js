const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require("babel-polyfill");


const extractSass = new ExtractTextPlugin({
  filename: "scss.css",
  disable: process.env.NODE_ENV === "development"
});

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
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.css$/,
        loader:'style!css!'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
    ]
  }
};
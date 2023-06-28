const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('babel-polyfill');

module.exports = {
  entry: {
    'public/build/bundle': './src/app/main.jsx'
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    path: path.resolve(__dirname, ''),
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-object-rest-spread', '@babel/plugin-transform-async-to-generator'],
          },
        },
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, type: 'asset/resource' },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'scss.css',
      ignoreOrder: true,
    }),
  ],
};
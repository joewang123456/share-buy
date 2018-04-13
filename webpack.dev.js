const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ReloadPlugin = require('reload-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    pathinfo: true,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: 'localhost',
    compress: true,
    clientLogLevel: 'none',
    disableHostCheck: true,
    proxy: {
      // '/lottery': 'http://localhost:3001'
    },
    historyApiFallback: {
      disableDotRule: true,
      // 指明哪些路径映射到哪个html
      rewrites: [
        { from: /^\/share$/, to: '/build/share.html' },
        { from: /^\/share-detail$/, to: '/build/share-detail.html' },
        { from: /^\/share-success$/, to: '/build/share-success.html' }
      ]
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['build']),
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([{ from: 'src/image', to: 'image' }]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReloadPlugin()
  ]
});

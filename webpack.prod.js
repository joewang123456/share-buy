const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    pathinfo: true,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1, minimize: true }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1, minimize: true }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              publicPath: '../',
              useRelativePath: true
            }
          },
          // {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 10000,
          //     name: '[name].[hash:8].[ext]',
          //     useRelativePath: true
          //   }
          // },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new UglifyJSPlugin(),
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([{ from: 'src/image', to: 'image' }])
  ]
});

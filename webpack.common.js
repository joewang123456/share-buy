const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    share: [
      path.resolve(__dirname, "./src/pages/share/index.js"),
    ],
    shareDetail: [
      path.resolve(__dirname, "./src/pages/share-detail/index.js"),
    ],
    shareSuccess: [
      path.resolve(__dirname, "./src/pages/share-success/index.js"),
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["share"],
      template: path.resolve(__dirname, 'src/pages/share/index.html'),
      filename: 'share.html',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["shareDetail"],
      template: path.resolve(__dirname, 'src/pages/share-detail/index.html'),
      filename: 'share-detail.html',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["shareSuccess"],
      template: path.resolve(__dirname, 'src/pages/share-success/index.html'),
      filename: 'share-success.html',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
    }),
  ],
  externals: {
    jquery: '$',
    wx: 'wx',
    html2canvas: 'html2canvas'
  }
};
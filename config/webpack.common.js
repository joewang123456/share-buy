const path = require('path');
const webpack = require('webpack');

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

  ],
  externals: {
    jquery: '$',
    wx: 'wx'
  }
};
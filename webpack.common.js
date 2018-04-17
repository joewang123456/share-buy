const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        share: [
            require.resolve('./polyfills'),
            path.resolve(__dirname, "./src/pages/share/index.js"),
        ],
        shareDetail: [
            require.resolve('./polyfills'),
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
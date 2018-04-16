const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ReloadPlugin = require('reload-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        port: 8080,
        clientLogLevel: 'none',
        disableHostCheck: true,
        proxy: {
            "/viplistenday": {
                "/target-local-api": 'http://m.test.ximalaya.com/',
                "target": "http://m.test.ximalaya.com/",
                "changeOrigin": true,
                "cookieDomainRewrite": "ops.test.ximalaya.com"
            }
        },
        historyApiFallback: {
            disableDotRule: true,
            // 指明哪些路径映射到哪个html
            rewrites: [
                // { from: /^\/share$/, to: '/share.html' },
                { from: /^\/share$/, to: '/share.html' },
                { from: /^\/share-detail$/, to: '/share-detail.html' },
                { from: /^\/share-success$/, to: '/share-success.html' }
            ]
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/, //匹配.js文件
                //排除也就是不转换node_modules下面的.js文件
                exclude: /(node_modules|bower_components)/,
                //加载器  webpack2需要loader写完整 不能写babel 要写 bable-loader
                use: [{ loader: "babel-loader" }]
            },
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
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["share"],
            template: 'src/pages/share/index.html',
            filename: 'share.html'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["shareDetail"],
            template: 'src/pages/share-detail/index.html',
            filename: 'share-detail.html'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["shareSuccess"],
            template: 'src/pages/share-success/index.html',
            filename: 'share-success.html'
        }),
        new ExtractTextPlugin('css/common.css'),
        // new CopyWebpackPlugin([{ from: 'src/image', to: 'image' }]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ReloadPlugin()
    ]
});

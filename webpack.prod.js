const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        pathinfo: true,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '//static2.test.ximalaya.com/source/share-buy/0.1.0/build/'
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
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["share"],
            template: 'src/pages/share/index.html',
            filename: 'share.html',
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeRedundantAttributes: true,
            //     useShortDoctype: true,
            //     removeEmptyAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     keepClosingSlash: true,
            //     minifyJS: true,
            //     minifyCSS: true,
            //     minifyURLs: true,
            // },
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["shareDetail"],
            template: 'src/pages/share-detail/index.html',
            filename: 'share-detail.html',
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeRedundantAttributes: true,
            //     useShortDoctype: true,
            //     removeEmptyAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     keepClosingSlash: true,
            //     minifyJS: true,
            //     minifyCSS: true,
            //     minifyURLs: true,
            // },
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["shareSuccess"],
            template: 'src/pages/share-success/index.html',
            filename: 'share-success.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new UglifyJSPlugin(),
        // new ExtractTextPlugin('css/[name].css'),
        new ExtractTextPlugin('css/common.css'),//样式文件打包到common.css中
        // new CopyWebpackPlugin([{ from: 'src/css/image', to: 'image' }]),
        new CopyWebpackPlugin([{ from: 'src/lib', to: 'lib' }])
    ]
});

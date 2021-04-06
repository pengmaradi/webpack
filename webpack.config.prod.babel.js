let webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let BUILD_DIR = path.join(__dirname, 'Resources/Public/');
let config = {
    mode: 'production',
    entry: {
        'frontend': path.join(__dirname, 'Resources/Private/JavaScript', 'frontend.js'),
        // 'debug': path.join(__dirname, 'Resources/Private/JavaScript', 'debug.js')
    },
    output: {
        filename: '[name].js',
        path: BUILD_DIR
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: 'Webfonts/[name].[ext]'
                }
                
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: 'Webfonts/[name].[ext]'
                },
            },
            {
                test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: 'Images/[name].[ext]'
                },
            },

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery', 'Cookies': 'js-cookie', Popper: ['popper.js', 'default']}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
    optimization: {
        // disable minification
        //minimize: false,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    mangle: true,
                    output: {
                        comments: false
                    },
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        // set false:0, true:1
                        booleans: false,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        // remove console.log
                        drop_console: true
                    },
                }
            })
        ],
    },
    performance: {
        hints: false, // false | "warning" | "error"
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
    },
    stats: {
        modules: false,
        hash: false,
        version: false,
        timings: true,
        chunks: false,
        children: false,
        source: false,
        publicPath: false
    },
};
module.exports = config;
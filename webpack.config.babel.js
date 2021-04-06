let webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        // 'frontend': path.join(__dirname, 'Resources/Private/JavaScript', 'frontend.js'),
        'debug': path.join(__dirname, 'Resources/Private/JavaScript', 'debug.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'Resources/Public/'),
        publicPath: 'http://localhost:9001/assets/'
    },
    devServer: {
        port: 9001,
        stats: {
            colors: true
        },
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        hot: true,
        inline: true
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/
            },
            {
                test: /\.scss$/, 
                use: [
                    'style-loader', 
                    'css-loader', 
                    'postcss-loader', 
                    'sass-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
                exclude: /node_modules/
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery', 'Cookies': 'js-cookie', Popper: ['popper.js', 'default']})
    ]
}
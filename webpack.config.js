const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist/JavaScript')
	},
	module: {
		rules: [
		{
			test: /\.(sa|sc|c)ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader",
				"sass-loader",
				]
		},
		{
			test: /\.(jpg|jpeg|gif|png|svg)$/,
			exclude: /node_modules/,
			loader:'file-loader',
			options: {
				limit: 15000,
				name: '[name].[ext]',
				outputPath: 'Images/',
			}
		},
		{
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			exclude: /\.svg$/,
			loader: 'file-loader',
			options: {
				limit: 100000,
				name: '[name].[ext]',
				outputPath: 'Fonts/',
			},
		}
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new MiniCssExtractPlugin({
			filename: "./../Css/app.css",
			chunkFilename: "[id].css"
		}),
	]
}
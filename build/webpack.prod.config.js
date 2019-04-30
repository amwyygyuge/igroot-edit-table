const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(webpackBaseConfig, {
	mode: 'production',
	entry: [ './demo/index.tsx' ],
	cache: true,
	output: {
		path: path.resolve(__dirname, '../playground'),
		filename: 'index.js',
		publicPath: '/',
		libraryTarget: 'umd'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './demo/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new UglifyJsPlugin()
	],
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				commons: {
					test: /react|react-dom/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
})

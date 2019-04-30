const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')

module.exports = merge(webpackBaseConfig, {
	mode: 'production',
	entry: './src/',
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		antd: 'antd'
	},

	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'index.js',
		publicPath: '/',
		libraryTarget: 'umd'
	}
})

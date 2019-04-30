const tsImportPluginFactory = require('ts-import-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [ '.ts', '.tsx', '.js', '.json' ]
	},
	module: {
		rules: [
			// { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				options: {
					getCustomTransformers: () => ({
						before: [
							tsImportPluginFactory({
								libraryName: 'igroot',
								libraryDirectory: 'lib',
								style: 'css'
							})
						]
					})
				},
				exclude: /node_modules/
			},
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					},
					{
						loader: 'css-loader' // translates CSS into CommonJS
					},
					{
						loader: 'less-loader' // compiles Less to CSS
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					},
					{
						loader: 'css-loader' // translates CSS into CommonJS
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		]
	}
}

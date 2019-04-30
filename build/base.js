const tsImportPluginFactory = require('ts-import-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [ '.ts', '.tsx', '.js', '.json', '.jsx' ]
	},
	module: {
		rules: [
			{ test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				options: {
					getCustomTransformers: () => ({
						before: [
							tsImportPluginFactory({
								libraryName: 'antd',
								libraryDirectory: 'lib',
								style: 'css'
							})
						]
					})
				},
				exclude: /node_modules/
			},
			// { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
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
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
					// publicPath: '/dist'
				})
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
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'bundle.css',
			disable: false,
			allChunks: true
		})
	]
}

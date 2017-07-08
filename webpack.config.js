// jshint esversion: 6
// Compiling to ES6 depends on UglifyJS support (and being ok with dropping IE11)

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractStyle = new ExtractTextPlugin("styles.css");
const path = require("path");

module.exports = {
	entry: {
		"index": "./src/js/app.ts"
	},
	output: {
		filename: "[name].js",
		path: path.join(__dirname, "dist/"),
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	externals: { angular: "angular" },
	module: {
		rules: [
			// Compile styles
			{ test: /\.less$/i, loader: extractStyle.extract(["css-loader", "less-loader"]) },
			// Compile .ts and .tsx files
			{ test: /\.tsx?$/, use: [{ loader: "ts-loader", options: { silent: true } }] }
		]
	},
	plugins: [extractStyle, new webpack.optimize.ModuleConcatenationPlugin()],

	// Pretty terminal output
	stats: {
		cached: false,
		children: false,
		chunks: false,
		chunkModules: false,
		chunkOrigins: false,
		colors: true,
		hash: false,
		maxModules: 0,
		modules: false,
		reasons: false,
		source: false
	}
};

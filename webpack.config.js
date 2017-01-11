// jshint esversion: 6

const UglifyJs = require("webpack/lib/optimize/UglifyJsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "index": "./src/js/app.ts"
    },
    output: {
        filename: "[name].js",
        path: "./dist/",
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
		externals: { angular: "angular" },
    module: {
        loaders: [
            // Compile .ts and .tsx files
            { test: /\.tsx?$/, loader: "ts?silent=true" },
            // Extract css files
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },
            // Extract less files
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less") },
            // Compile angular templates
            { test: /\.html$/, loader: "ng-cache?name=[name]&-preserveLineBreaks&-conservativeCollapse" }
        ]
    },
    plugins: [
        new UglifyJs({ compress: { warnings: false } }),//, sourceMap: false
        new ExtractTextPlugin("styles.css"),// Write out CSS bundle to its own file
    ],

    // Pretty terminal output
    stats: { colors: true }
};

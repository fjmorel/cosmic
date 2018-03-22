// jshint esversion: 6
// Compiling to ES6 depends on UglifyJS support (and being ok with dropping IE11)

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractStyle = new ExtractTextPlugin("styles.css");
const path = require("path");

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'home': './src/js/home/app.ts',
    'reference': './src/js/reference/app.ts',
    'generator': './src/js/generator/app.ts'
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "docs/dist/"),
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      // Compile styles
      { test: /\.scss$/i, loader: extractStyle.extract(["css-loader", "sass-loader"]) },
      // Compile .ts and .tsx files
      {
        test: /\.tsx?$/, use: [
          { loader: "ts-loader", options: { silent: true } },
          { loader: "angular2-template-loader" }// Change templateUrl to require("*.html")
        ]
      },
      // Embed HTML files
      {
        test: /\.(html)$/,
        use: [
          { loader: "raw-loader" },
          // html-loader messes up the output of templates for some reason
          // { loader: "html-loader", options: { minimize: true, url: false } }
        ]
      },
    ]
  },
  optimization: {
    concatenateModules: true,
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      name: "shared"
    }
  },
  performance: {
    hints: false// Stop entry point / asset size warnings
  },
  plugins: [extractStyle],
  watchOptions: {
    ignored: /node_modules/
  },
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

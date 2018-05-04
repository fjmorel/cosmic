// jshint esversion: 6

const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    extensions: [".ts", ".js", ".scss"]
  },
  module: {
    rules: [
      // Compile .scss files and extract to separate .css file
      { test: /\.scss$/i, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] },
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
  plugins: [
    new MiniCssExtractPlugin({ filename: "styles.css", chunkFilename: "styles.css" })
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};

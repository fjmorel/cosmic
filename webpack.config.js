// jshint esversion: 6
// Compiling to ES6 depends on UglifyJS support (and being ok with dropping IE11)

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractStyle = new ExtractTextPlugin("styles.css");
const path = require("path");

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'shared': './src/shared.ts',
    'home': './src/js/home/app.ts',
    'reference': './src/js/reference/app.ts',
    'generator': './src/js/generator/app.ts'
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "docs/dist/"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  externals: { angular: "angular" },
  module: {
    rules: [
      // Compile styles
      { test: /\.scss$/i, loader: extractStyle.extract(["css-loader", "sass-loader"]) },
      // Compile .ts and .tsx files
      {
        test: /\.tsx?$/, use: [
          { loader: "ts-loader", options: { silent: true } },
          { loader: "angular2-template-loader" }
        ]
      },
      /* Embed files. */
      {
        test: /\.(html)$/,
        use: [
          { loader: "raw-loader" },
          {
            loader: "html-minify-loader", options: {
              empty: true,        // KEEP empty attributes
              quotes: true,
              dom: { // options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
                lowerCaseAttributeNames: false, // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    extractStyle,
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, './src')
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['shared', 'polyfills']
    })
  ],

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

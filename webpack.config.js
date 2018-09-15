var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './src', 'app', 'index.js'),
    devtool: "source-map",
    output: {
        path: path.join(__dirname, './src', 'js'),
        filename: 'bundle.js',
    },
    plugins: [],
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                  loader: "babel-loader",
                }],
            },
            {
              test: /\.scss$/,
              use: [
                  "style-loader", // creates style nodes from JS strings
                  "css-loader", // translates CSS into CommonJS
                  "sass-loader" // compiles Sass to CSS, using Node Sass by default
              ]
            },
            {
              test: /\.(jpg|jpeg|png|gif|svg)$/,
              use: [
                'file-loader',
                {
                  loader: 'image-webpack-loader',
                  options: {
                    bypassOnDebug: true,
                  },
                },
              ],
            }
        ]
    }
};
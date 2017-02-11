var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, './src', 'app', 'index.js'),
    devtool: "source-map",
    output: {
        path: path.join(__dirname, './src', 'js'),
        filename: 'bundle.js',
    },
    plugins: [],
    module: { //Обновлено
        loaders: [ //добавили babel-loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query:
                {
                    presets:['react']
                }
            },
            {
              test: /\.(jpg|png|svg)$/,
              loaders: [
                'file-loader',
                {
                  loader: 'image-webpack-loader',
                  query: {
                    progressive: true,
                    optimizationLevel: 7,
                    interlaced: false,
                    pngquant: {
                      quality: '65-90',
                      speed: 4
                    }
                  }
                }
              ],
              include: './src/media'
            }
        ]
    }
};
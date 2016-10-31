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
                loaders: ['babel-loader'],
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    }
};
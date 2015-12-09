var path = require('path');
var webpack = require('webpack');
var DEV = process.argv.indexOf('--dev') !== -1;

module.exports = {
    devtool: 'source-map',
    debug: !!DEV,
    entry: path.resolve(__dirname, 'src/ProcessSlider.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    resolve: {
        root: path.resolve(__dirname, 'src'),
        extensions: ['', '.js']
    },
    plugins: DEV ? [] : [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    module: {
        loaders: []
    }
}

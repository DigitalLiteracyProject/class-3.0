var webpack = require('webpack');
var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');

var config = {
    context: __dirname,
    output: {
        path: path.resolve('../assets/bundles/'),
        filename: '[name].js'
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),

        // share dependencies across different entries in common chunks
        new webpack.optimize.CommonsChunkPlugin('commons'),
    ],
    entry: {
        commons: ['react', 'react-dom'],
        reimburse: './reimburse/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;

const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');


const config = {
    context: __dirname,
    output: {
        path: path.resolve('../backends/_frontend_outputs/bundles/'),
        filename: '[name].js'
    },
    plugins: [
        new BundleTracker({filename: '../backends/_frontend_outputs/webpack-stats.json'}),

        // make React JSX interpretation available without explicit import React in each file
        new webpack.ProvidePlugin({
            React: 'react'
        }),

        // share dependencies across different entries in common chunks
        new webpack.optimize.CommonsChunkPlugin('commons'),
    ],
    entry: {
        commons: ['react', 'react-dom'],
        reimburse: './reimburse/index.js',
        draw: './draw/index.js',
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
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;

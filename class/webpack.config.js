var webpack = require('webpack');
var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');

var config = {
    context: __dirname,
    entry: './assets/js/index',
    output: {
	path: path.resolve('./assets/bundles/'),
	filename: '[name]-[hash].js'
    },
    plugins: [
	new BundleTracker({filename: './webpack-stats.json'}),
	
	//makes jQuery available in every module
        new webpack.ProvidePlugin({ 
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' 
        })
    ],
    module: {
        loaders: [
            {test: /\.jsx?$/, 
             exclude: /node_modules/, 
             loader: 'babel-loader', 
             query: {
                 presets: ['react'] 
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

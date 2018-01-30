const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [path.join(__dirname, './index.tsx')],
    output: {
      path: path.join(__dirname, '../assets/js'),
      publicPath: '/js/',
      filename: 'bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            // {
            //     test: /\.tsx?$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre',
            //     loader: 'tslint-loader'
            // },
            // {
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     loader: 'source-map-loader'
            // },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: 'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]'
            //     })
            // },
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new ExtractTextPlugin({
        //     filename: 'bundle.css',
        //     disable: false,
        //     allChunks: true,
        // })
    ],

};

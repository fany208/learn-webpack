var webpack = require('webpack')
var path = require('path')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: {
        'pageA': './src2/pageA.js',
        'pageB': './src2/pageB.js',
        // 'vendor': ['lodash']
    },

    output: {
        path: path.resolve(__dirname, './dist2'),
        publicPath: './dist2/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            // async: true,
            async: 'async-common',
            children: true,
            minChunks: 2
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new CleanWebpackPlugin(['dist2'])
    ]
}

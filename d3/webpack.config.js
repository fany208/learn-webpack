var webpack = require('webpack')
var path = require('path')
module.exports = {
    entry: {
        'pageA': './src/pageA.js',
        'pageB': './src/pageB.js',
        'vendor': ['lodash']
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    plugins: [

        /*
        * 将公共代码打包到一起
        *
        * */
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: 2
        // }),
        /*
        *
        * 将第三方库和webpack生成的公共代码打包到一起
        * */
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: Infinity
        // }),
        /*
        *
        * 将第三方库和webpack生成的公共代码分离开
        * */
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks: Infinity
        // })

        /*
        * 上面两个可以合并写成一个
        * */
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','manifest'],
            minChunks: Infinity
        }),


        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            deepChildren: true
            // chunks: ['pageA', 'pageB']
        }),
    ]
}

const Webpack = require('webpack')
const PurifyCSS = require('purifycss-webpack')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const path = require('path')
const glob = require('glob-all')

module.exports = {
    plugins: [
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, '../*.html'),
                path.join(__dirname, '../src/*.js')
            ])
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        new HtmlInlineChunkPlugin({
            inlineChunks: [ 'manifest' ]
        }),

        new Webpack.optimize.UglifyJsPlugin(),

        new CleanWebpackPlugin([ 'dist' ], {
            /*
            * 这里犹豫配置文件在build目录下，需要设置一下根目录位置，默认是以配置文件的目录为根目录，这样清除的地址就不是所预期的。如果直接把上面的[ 'dist' ]改为[ '../dist' ]而不设置root，仍然会有问题，提示如下：
            * clean-webpack-plugin: /usr/local/var/www/learn-webpack/d11/dist is outside of the project root. Skipping...
            * */
            root: path.resolve(__dirname, '../')
        })
    ]
}

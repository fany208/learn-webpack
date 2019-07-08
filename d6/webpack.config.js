var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var PurifyCSS = require('purifycss-webpack')
var glob = require('glob-all')
var Webpack = require('webpack')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.js/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: ['lodash']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks: false  //提取css的范围，默认是false。只提取初始化的css，设置为true的话，就会把所有的import进来的文件都提取出来
        }),
        /*
        * PurifyCSS必须放在ExtractTextWebpackPlugin之后
        * */
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, '*.html'),
                path.join(__dirname, 'src/*.js')
            ])
        }),
        /*
        * 对js文件进行tree shaking
        * */
        new Webpack.optimize.UglifyJsPlugin()
    ]
}

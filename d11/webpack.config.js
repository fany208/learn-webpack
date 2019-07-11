var Webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var PurifyCSS = require('purifycss-webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name].bundle.[hash:5].css',
    allChunks: false
})

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'js/[name].bundle.[hash:5].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        chunkFilename: '[name].chunk.[hash:5].js'
    },
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    },

    devtool: 'cheap-module-source-map',
    devServer: {
        inline: true,   //默认值为true。
        port: 9001,
        // historyApiFallback: true  所有不存在的路径全都重定向到首页
        historyApiFallback: {
            rewrites: [
                {
                    from: '/pages/a',
                    to: '/pages/a.html'
                },
                {
                    from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
                    to: function (context) {
                        return '/' + context.match[ 1 ] + context.match[ 2 ] + '.html'
                    }
                }
            ]
        },
        proxy: {
            '/': {
                // target: 'https://m.weibo.cn',
                target: 'https://sun.mucang.cn',
                changeOrigin: true,
                logLevel: 'debug', //在控制台查看相关请求信息
                pathRewrite: {
                    '^/hotflow': '/comments/hotflow'
                },
                headers: {
                    'Cookie': 'JSESSIONID=C6FEE93B324B42ED71AAE32BE28259DA'
                }
            }
        },

        hot: true,
        hotOnly: true,
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // singleton: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: function (loader) {
                                return [
                                    require('postcss-cssnext')()
                                ]
                            },
                            sourceMap: true

                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.js/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'src/libs')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [ 'env' ],
                            plugins: [ 'lodash' ],
                            compact: true
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // useRelativePath: true,
                            outputPath: 'assets/imgs/',
                            name: '[name].[ext]',
                            // publicPath: '../assets/imgs/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            /*
                            * 指定要解析的属性
                            * */
                            attrs: [ 'img:src', 'img:data-src' ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractLess,
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, '*.html'),
                path.join(__dirname, 'src/*.js')
            ])
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        new HtmlInlineChunkPlugin({
            inlineChunks: [ 'manifest' ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // inject: false,

            chunks: [ 'app', 'manifest' ],
            minify: {
                collapseWhitespace: true
            }
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index1.html',
        //     template: './index.html',
        //     chunks: ['app1']
        // }),

        // new Webpack.optimize.UglifyJsPlugin({
        //     // 配合devtool开启source-map
        //     sourceMap: true
        // }),


        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),

        new Webpack.ProvidePlugin({
            $: 'jquery'
        }),

        new CleanWebpackPlugin([ 'dist' ])
    ]
}

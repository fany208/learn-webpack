var path = require('path')
var glob = require('glob-all')

var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var PurifyCSS = require('purifycss-webpack')
var Webpack = require('webpack')
var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name].min.css',
    allChunks: false  //提取css的范围，默认是false。只提取初始化的css，设置为true的话，就会把所有的import进来的文件都提取出来
})
var {CleanWebpackPlugin} = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].bundle.[hash:5].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'dist/',
        chunkFilename: '[name].chunk.[hash:5].js'
    },
    devtool: 'source-map',
    devServer: {
        port: '9001',
        // inline:false,
        hot: true,
        hotOnly: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: '/page/a',
                    to: '/a.html'
                }
            ]
        },
        proxy: {
            '/': {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '^/hotflow': '/comments/hotflow'
                },
                headers: {
                    'Cookie': '_T_WM=55357279059; WEIBOCN_FROM=1110006030; MLOGIN=0; M_WEIBOCN_PARAMS=lfid%3D102803%26luicode%3D20000174%26uicode%3D20000174'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // use1: extractLess.extract({
                //     fallback: {
                //         loader: 'style-loader',
                //         options: {
                //             singleton: true,
                //         }
                //     },
                //     use: [
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 importLoaders: 2
                //             }
                //         },
                //         {
                //           loader: 'postcss-loader',
                //           options: {
                //               ident: 'postcss',
                //               plugins: function (loader) {
                //                   return [
                //                       // require('postcss-sprites'),
                //                       require('postcss-cssnext')
                //                   ]
                //               }
                //           }
                //         },
                //         {
                //             loader: 'less-loader'
                //         }
                //     ]
                // }),
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
                                    // require('postcss-sprites'),
                                    require('postcss-cssnext')
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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            // plugins: ['lodash']
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
                            name: '[name].[ext]',
                            publicPath: '../images/',
                            outputPath: 'images/',
                        }
                    },
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         name: '[name].[ext]',
                    //         limit: 10,
                    //                 publicPath: '../images/',
                    //                 outputPath: 'images/'
                    //     }
                    // },
                    // {
                    //     loader: 'img-loader',
                    //     options: {
                    //         pngquant: {
                    //             quality: 50
                    //         }
                    //     }
                    // }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            root: path.resolve(__dirname, 'assets'),
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // extractLess,
        // new PurifyCSS({
        //     paths: glob.sync([
        //         path.join(__dirname, '*.html'),
        //         path.join(__dirname, 'src/*.js')
        //     ])
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // inject: false,
            chunks: ['app'],
            // minify: {
                // collapseWhitespace: true
            // }
        }),
        new Webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // new Webpack.optimize.UglifyJsPlugin(),
        new CleanWebpackPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin()
    ]
}

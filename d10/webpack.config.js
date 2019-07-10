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
    //提取css的范围，默认是false。只提取初始化的css，设置为true的话，就会把所有的import进来的文件都提取出来
    allChunks: false
})

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'js/[name].bundle.[hash:5].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        chunkFilename: '[name].chunk.[hash:5].js'
    },
    resolve: {
        alias: {
            /*
            * 这里的$符号用来缩小范围到只命中以关键字结尾的导入语句：
            * */
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    },

    /*
    * 开启source-map功能
    * 一般开发时配置cheap-module-source-map
    * 发布时设置成source-map
    *
    * 如果开启了js代码混淆，在Webpack.optimize.UglifyJsPlugin中加上sourceMap配置
    * 对于css文件的source-map功能，需要在每一个处理loader中加上sourceMap配置
    *
    * */
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
        /*
        * devServer的proxy功能实际上是内部集成了http-proxy-middleware
        * */
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
                    /*
                    * 验证身份，将浏览器中的cookie拷贝出来添加到请求头中
                    * */
                    'Cookie': 'JSESSIONID=C6FEE93B324B42ED71AAE32BE28259DA'
                }
            }
        },
        /*
        * 模块热更新相关插件
        * */
        hot: true,
        hotOnly: true,
        overlay: true
    },
    module: {
        rules: [
            // {
            //     test: /\.less$/,
            //     use: extractLess.extract({
            //         fallback: {
            //             loader: 'style-loader',
            //             options: {
            //                 singleton: true,
            //             }
            //         },
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 options: {
            //                     importLoaders: 2
            //                 }
            //             },
            //             {
            //                 /*
            //                 * postcss-loader在css之前
            //                 * */
            //                 loader: 'postcss-loader',
            //                 options: {
            //                     /*
            //                     * ident指定后面的plugins是为postcss所用的
            //                     * */
            //                     ident: 'postcss',
            //                     plugins: function (loader) {
            //                         return [
            //                             require('postcss-cssnext')()
            //                         ]
            //                     },
            //
            //                 }
            //             },
            //             {
            //                 loader: 'less-loader'
            //             }
            //         ]
            //     })
            // },
            /*
            * 经测试发现修改样式文件没有触发模块热更新，原因是这里用extractLess提取了样式。而在style-loader里面集成了模块热更新功能，所以先去掉提取样式的配置
            *
            * */
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            /*
                            * 开启了source-map之后，需要把singleton:true这个配置去掉，这样才能在调试的时候看到每个样式的具体文件文职
                            * */
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
                        /*
                        * postcss-loader在css之前
                        * */
                        loader: 'postcss-loader',
                        options: {
                            /*
                            * ident指定后面的plugins是为postcss所用的
                            * */
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
                            /*
                            * 文件输出目录
                            * */
                            outputPath: 'assets/imgs/',
                            name: '[name].[ext]',
                            /*
                            * css样式中改写引用资源的目录
                            * */
                            // publicPath: '../assets/imgs/'
                        }
                    }
                ]
            },
            /*
            *
            * 通过imports-loader来实现注入jquery，此时保留resolve配置，去除Webpack.ProvidePlugin配置并删除node_modules中的jquery模块
            *
            * 这种方式引入jquery会和eslint的相关规则相冲突。因为这种方式为在代码中加上额外的引入代码
            * var $ = require("jquery")
            * */
            // {
            //     test: path.resolve(__dirname, 'src/app.js'),
            //     use: {
            //         loader: 'imports-loader',
            //         options: {
            //             $: 'jquery'
            //         }
            //     }
            // },

            /*
            *
            * 另一种解析html中图片的方式通过${require('')}
            * eg: <img src="${require('./src/assets/imgs/5.png')}">
            * */
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
        // new Webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
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
        * 将webpack生成的代码提取出来
        * */
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        /*
        * inlineChunks指定要插入到页面的chunk名称，同事HtmlWebpackPlugin中的chunks配置中也得加上这个chunk
        * */
        new HtmlInlineChunkPlugin({
            inlineChunks: [ 'manifest' ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // inject: false,

            /*
            * 如果不指定chunks，默认会把所有entry的chunk载入到页面中
            * */
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
        /*
        * 对js文件进行tree shaking
        * */
        // new Webpack.optimize.UglifyJsPlugin({
        //     // 配合devtool开启source-map
        //     sourceMap: true
        // }),

        /*
        * 模块热更新相关插件
        * */
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(), // 查看具体的模块路径

        new Webpack.ProvidePlugin({
            $: 'jquery'
        }),

        new CleanWebpackPlugin([ 'dist' ])
    ]
}

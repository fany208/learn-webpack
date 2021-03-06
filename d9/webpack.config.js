var Webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var PurifyCSS = require('purifycss-webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')


var path = require('path')
var glob = require('glob-all')

var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name].bundle.[hash:5].css',
    allChunks: false  //提取css的范围，默认是false。只提取初始化的css，设置为true的话，就会把所有的import进来的文件都提取出来
})

module.exports = {
    entry: {
        app: './src/app.js',
        // app1: './src/app1.js'
    },
    output: {
        filename: '[name].bundle.[hash:5].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://192.168.1.194:8080/webpack/d9/dist/',
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
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
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
                                plugins: function(loader){
                                    return [
                                        require('postcss-cssnext')()
                                    ]
                                },

                            }
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
                            plugins: ['lodash'],
                            compact: true
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
            * */
            {
                test: path.resolve(__dirname,'src/app.js'),
                use: {
                    loader: 'imports-loader',
                    options: {
                        $: 'jquery'
                    }
                }
            },

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
                            attrs: ['img:src', 'img:data-src']
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
            inlineChunks: ['manifest']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // inject: false,

            /*
            * 如果不指定chunks，默认会把所有entry的chunk载入到页面中
            *
            *
            *
            * */
            chunks: ['app','manifest'],
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
        new Webpack.optimize.UglifyJsPlugin()
    ]
}

var Webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var PurifyCSS = require('purifycss-webpack')

var path = require('path')
var glob = require('glob-all')
var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name].min.css',
    allChunks: false  //提取css的范围，默认是false。只提取初始化的css，设置为true的话，就会把所有的import进来的文件都提取出来
})
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        chunkFilename: '[name].chunk.js'
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
                            plugins: ['lodash']
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
                            useRelativePath: true,
                            /*
                            * 文件输出目录
                            * */
                            // outputPath: 'css/',
                            name: '[name].[ext]',
                            /*
                            * css样式中改写引用资源的目录
                            * */
                            publicPath: '../assets/imgs/'
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
        // new PurifyCSS({
        //     paths: glob.sync([
        //         path.join(__dirname, '*.html'),
        //         path.join(__dirname, 'src/*.js')
        //     ])
        // }),
        /*
        * 对js文件进行tree shaking
        * */
        new Webpack.optimize.UglifyJsPlugin()
    ]
}

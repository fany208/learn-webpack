var path = require('path')

/*
* 提取文件的插件
* */
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
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
                            insertInto: '#insert_at',
                            singleton: true,
                            transform: './css.transform.js'
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
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
                                plugins: [
                                    // require('autoprefixer')(),
                                    /*
                                    * postcss-cssnext包含了autoprefixer
                                    * */
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         {
            //             loader: 'style-loader',
            //             options: {
            //                 insertInto: '#insert_at',
            //                 singleton: true,
            //                 transform: './css.transform.js'
            //             }
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 minimize: true,
            //                 modules: true,
            //                 localIdentName: '[path][name]_[local]_[hash:base64:5]'
            //             }
            //         },
            //         {
            //             loader: 'less-loader'
            //         }
            //     ]
            // }

            /*
             * 这种方式会在页面中插入style标签
             * */
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: 'style-loader',
            //             options: {
            //                 insertInto: '#insert_at',
            //                 singleton: true,
            //                 /*
            //                 * css.transform.js不是在webpack打包的时候执行，是在浏览器环境下，css样式插入到页面前，在这里可以拿到浏览器的相关参数，例如：UA，window对象等，根据所能获得参数对css做相应的形变。
            //                 *
            //                 * 此js会根据引入css文件的个数执行多次
            //                 * */
            //                 transform: './css.transform.js'
            //             }
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 minimize: true,
            //                 /*
            //                 * 开启css-module
            //                 * */
            //                 modules: true,
            //                 /*
            //                 * 设置css样式的class名称，不设置localIdentName的话就是一堆字符串
            //                 * */
            //                 localIdentName: '[path][name]_[local]_[hash:base64:5]'
            //             }
            //         }
            //     ]
            // }
            /*
            * 这种方式不会在页面中插入style标签，而是会插入link标签。但是有个问题，如果引入多个css文件，会生成多个link标签
            * */
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: 'style-loader/url'
            //         },
            //         {
            //             loader: 'file-loader'
            //         }
            //     ]
            // }
            /*
            * 这种方式可以控制样式是否插入到页面中
            *
            * 在js中引入css模块之后，可以使用use和unse方法控制css是否启用。在app.js中查看示例
            * */
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: 'style-loader/useable'
            //         },
            //         {
            //             loader: 'css-loader'
            //         }
            //     ]
            // }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            /*
            * 指定提取css的范围。
            * 默认值为false：只为提取初始化的css
            * 如果值为true：会将所有引入的css全部提取出来
            * */
            allChunks: true
        })
    ]
}

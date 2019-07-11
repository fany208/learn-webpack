const Webpack = require('webpack')
const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')

const merge = require('webpack-merge')

var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const generateConfig = env => {

    var extractLess = new ExtractTextWebpackPlugin({
        filename: 'css/[name].bundle.[hash:5].css',
        allChunks: false
    })

    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                sourceMap: env === 'development'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: function (loader) {
                    return [
                        require('postcss-cssnext')()
                    ].concat(env==='production' ? [require('postcss-sprites')({
                        spritePath: 'dist/assets/imgs/'
                    })] : [])
                },
                sourceMap: env === 'development'

            }
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: env === 'development'
            }
        }
    ]

    const scriptLoader = [
        {
            loader: 'babel-loader'
        }
    ].concat(env === 'production' ? [] : [ {
        loader: 'eslint-loader',
        options: {
            formatter: require('eslint-friendly-formatter')
        }
    } ])

    const styleLoader = env === 'production' ? extractLess.extract({
        fallback: 'style-loader',
        use: cssLoaders
    }) : [{
            loader: 'style-loader',
            options: {
                // singleton: true,
                sourceMap: env === 'development'
            }
        }].concat(cssLoaders)

    const fileLoader = env === 'development' ? [
        {
            loader: 'file-loader',
            options: {
                outputPath: 'assets/imgs/',
                name: '[name].[ext]',
            }
        }
    ] : [
        {
            loader: 'file-loader',
            options: {
                outputPath: 'assets/imgs/',
                name: '[name].[ext]',
                limit: 1000
            }
        },
        {
            loader: 'img-loader',
            options: {
                plugins: [
                    require('imagemin-pngquant')({
                        floyd: 0.5,
                        speed: 1
                    })
                ]
            }
        }
    ]

    return {
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
                jquery$: path.resolve(__dirname, '../src/libs/jquery.min.js')
            }
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: styleLoader
                },
                {
                    test: /\.js/,
                    include: [ path.resolve(__dirname, '../src') ],
                    exclude: [ path.resolve(__dirname, '../src/libs'), path.resolve(__dirname, 'node_modules/')],
                    use: scriptLoader
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader
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
            new Webpack.ProvidePlugin({
                $: 'jquery'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                minify: {
                    collapseWhitespace: true
                }
            })
        ]
    }
}


module.exports = env => {
    let config = env === 'production' ? productionConfig : developmentConfig

    return merge(generateConfig(env), config)
}

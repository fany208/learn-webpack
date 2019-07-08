module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: 'babel-loader',
                use: {
                    loader: 'babel-loader',
                    /*
                    *
                    * 这里的options一般放到.babelrc文件下
                    *
                    * */
                    // options: {
                    //     presets: [
                    //         ['@babel/preset-env', {
                    //             targets: {
                    //                 browsers: ['> 1%', 'last 2 versions']
                    //             }
                    //         }]
                    //     ]
                    // }
                },
                exclude: '/node_modules/'
            }
        ]
    }
}

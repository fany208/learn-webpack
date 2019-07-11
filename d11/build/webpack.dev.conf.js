const Webpack = require('webpack')
const historyFallback = require('./historyfallback')
const proxy = require('./proxy')
module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        inline: true,
        port: 9001,
        historyApiFallback: historyFallback,
        proxy: proxy,
        hot: true,
        hotOnly: true,
        overlay: true
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin()
    ]
}

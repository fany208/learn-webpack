module.exports = {
    '/.+': {
        target: 'https://m.weibo.cn',
        // target: 'https://sun.mucang.cn',
        changeOrigin: true,
        logLevel: 'debug', //在控制台查看相关请求信息
        pathRewrite: {
            '^/hotflow': '/comments/hotflow'
        },
        headers: {
            'Cookie': 'JSESSIONID=C6FEE93B324B42ED71AAE32BE28259DA'
        }
    }
}

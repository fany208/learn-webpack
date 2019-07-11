module.exports = {
    root: true,
    extends: 'standard',
    plugins: [
        'html'
    ],
    env: {
      browser: true,
      node: true
    },
    globals: {
        /*
        * q
        * */
        $: true
    },
    rules: {
        /*
        * 缩进值
        * */
        indent: ['error', 4],
        // /*
        // * 取消代码结尾处的空行
        // * */
        // 'eol-last': ['error', 'never']
    }
}

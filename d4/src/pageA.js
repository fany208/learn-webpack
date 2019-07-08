/*
*
* *动态import,在引入时候就执行了
webpackChunkName如果命名为相同的名字就会将模块打包到一起
*
*/

import(/* webpackChunkName: 'wmSubPageA' */ './subPageA').then(function (subPageA) {
    console.log(subPageA)
})
import(/* webpackChunkName: 'wmSubPageA' */'./subPageB').then(function (subPageB) {
    console.log(subPageB)
})

/*
*
* 使用reuqire.ensure进行代码分割第三方库
*
* */
// require.ensure([ 'lodash' ], function () {
//     var _ = require('lodash')
//     _.join([ 2, 3, 4 ], 1)
// }, 'vendor')


/*
*
* 分别引入模块
*
* */

// require.ensure([ './subPageA' ], function () {
//     var subPageA = require('./subPageA')
//
// }, 'subPageA')
// require.ensure([ './subPageB' ], function () {
//     var subPageB = require('./subPageB')
//
// }, 'subPageB')

/*
*
* 同时引入会打包到一个模块文件中
*
* */
// require.ensure([ './subPageA', './subPageB' ], function () {
//     var subPageA = require('./subPageA')
//     var subPageB = require('./subPageB')
//
// }, 'subPageAB')

/*
*
* 使用require.include()将'./subPageA','./subPageA'中的共同模块引入进来
* 打包后会将moduleA模块打到pageA的chunk中，这样subPageA和subPageA的chunk中就没有moduleA了，公用父级模块中的moduleA
*
* 如果再想把moduleA单独打包出来，有两种方法：
* 1、在引用moduleA模块的模块中进行异步引入
* 2、通过webpack的配置实现。如下：
* new webpack.optimize.CommonsChunkPlugin({
            async: true,                //async值为true时，chunk的name会以chunkId开头
            // async: 'async-common',   //async值为字符串为用作chunk的name开头
            children: true,
            minChunks: 2
        }),
*
*
* */
// require.include('./moduleA')

export default 'pageA'


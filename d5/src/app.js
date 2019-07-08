// import base from './css/base.css'
// import common from './css/common.css'
//
// var app = document.getElementById('app');
//
// app.innerHTML = '<div class="'+base.box+'"></div>'


/*
* 对应style-loader/useable的示例
* */
// var flag = false;
// setInterval(function () {
//     flag = !flag
//     if(flag){
//         base.use()
//     }else{
//         base.unuse();
//     }
// }, 5000)



import base from './less/base.less'
import common from './less/common.less'

var app = document.getElementById('app');

app.innerHTML = '<div class="'+base.box+'"></div>'

/*
*
* 验证ExtractTextWebpackPlugin的allChunks参数作用
* */
import(/*webpackChunkName: 'a' */ './component/a').then(function (a) {
    console.log(a)
})




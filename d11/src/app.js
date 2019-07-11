import base from './less/base.less'
import { componentA } from './components/a'
import { a } from './common/util'
a()
var app = document.getElementById('app')
app.innerHTML = '<div class="' + base.box + '"></div>'

var list = componentA()
var one = document.getElementById('one')
one.appendChild(list)

// $('div').addClass('box')

// $.get('/hotflow?id=4385217563008443&mid=4385217563008443&max_id_type=0', function (data) {
//     console.log(data)
// })
//
// console.log(1)
//
// $.get('/msg/index', {
//     format: 'cards'
// }, function (data) {
//     console.log(data)
// })
$.get('/api/admin/daily-plan/list.htm', {}, function (data) {
    console.log(data)
})

/*
* 模块热更新的功能一般都是有loader实现，开发者只需要专注于业务代码的开发
* */

if (module.hot) {
    module.hot.accept('./components/a', function () {
        one.removeChild(list)
        let comA = require('./components/a').componentA
        let nlist = comA()
        one.appendChild(nlist)
        list = nlist
    })
}

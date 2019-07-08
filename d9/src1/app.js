import base from './less/base.less'
import {componentA} from './components/a'
var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'box'
app.appendChild(div)


var list = componentA();
var one = document.getElementById('one')
one.appendChild(list)
// import {a} from './common/util'
//
// console.log(a())

// import { chunk } from 'lodash-es'

// console.log(chunk([1,2,3,4,5,6,7], 2))

$('div').addClass('test-jquery')
console.log('123')

$('div').css('border', '1px solid blue')
$.get('/hotflow?id=4385217563008443&mid=4385217563008443&max_id_type=0', function (data) {
    console.log(data)
})

console.log(1)

$.get('/msg/index', {
    format: 'cards'
}, function (data) {
    console.log(data)
})

if(module.hot){
    module.hot.accept('./components/a', function () {
        one.removeChild(list)
        let comA = require('./components/a').componentA;
        let nlist = comA();
        one.appendChild(nlist)
        list = nlist;
    });
}

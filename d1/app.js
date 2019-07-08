import {a} from './es6'
con1()

let con2 = require('./commonjs')
con2()


require(['./amd'], function (con3) {
    con3();
})

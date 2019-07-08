
/*
* 全局垫片使用方式，直接引入babel-polyfill
* 局部垫片在.babelrc中配置
* */
// import 'babel-polyfill'

let fn = () => {}

const n = 123

const arr = [1,2,3,4,5,6]

arr.includes(8)

let narr = arr.map(item => item +1)

console.log( 'new Set(narr)', new Set(narr))

function* fun() {

}

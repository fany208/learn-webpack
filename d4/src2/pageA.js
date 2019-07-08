import * as _ from 'lodash'


import(/* webpackChunkName: 'wmSubPageA' */ './subPageA').then(function (subPageA) {
    console.log(subPageA)
})
import(/* webpackChunkName: 'wmSubPageB' */'./subPageB').then(function (subPageB) {
    console.log(subPageB)
})


export default 'pageA'


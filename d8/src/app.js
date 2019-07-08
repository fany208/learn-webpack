import base from './less/base.less'

var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'small'
app.appendChild(div)

import {a} from './common/util'

console.log(a())

import { chunk } from 'lodash'

console.log(chunk([1,2,3,4,5,6,7], 2))



$('div').addClass('2345')

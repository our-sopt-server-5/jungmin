//const sum = require('./sum_module');
const sumModule = require('../모듈/cal');

//var result = sum(1, 3);
var add = sumModule.add(1, 3);
var sub = sumModule.sub(1, 3);
var mul = sumModule.mul(1, 3);
var div = sumModule.div(1, 3);

//console.log('sum result : ', result);
console.log('add result : ', add);
console.log('add result : ', sub);
console.log('add result : ', mul);
console.log('add result : ', div);

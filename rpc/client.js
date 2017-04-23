/*
* @Author: nurulnabi
* @Date:   2017-04-22 13:49:44
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-23 18:17:00
*/

Promise = require('bluebird');
var dnode = Promise.promisifyAll(require('dnode'))

var d = dnode.connect(5004);
// d.on('remote', function (remote) {
//     console.log(remote);
// });
console.log(dnode);
// d.on('remote')
// .then(function(remote){
// 	console.log(remote);
// })

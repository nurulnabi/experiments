/*
* @Author: nurulnabi
* @Date:   2017-04-22 13:49:44
* @Last Modified by:   noor
* @Last Modified time: 2017-04-25 11:17:03
*/

// Promise = require('bluebird');
var dnode = require('dnode')

var d = dnode.connect(5004);
d.on('remote', function (remote) {
    console.log(remote);
});
console.log(dnode);

// d.on('remote')
// .then(function(remote){
// 	console.log(remote);
// })

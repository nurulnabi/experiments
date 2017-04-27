/*
* @Author: nurulnabi
* @Date:   2017-04-22 13:49:44
* @Last Modified by:   noor
* @Last Modified time: 2017-04-27 18:38:27
*/

// // Promise = require('bluebird');
// var dnode = require('dnode')

// var d = dnode.connect(5004);
// d.on('remote', function (remote) {
//     console.log(remote);
// });
// console.log(dnode);

// // d.on('remote')
// // .then(function(remote){
// // 	console.log(remote);
// // })

var io = require('socket.io-client');
io.connect("http://127.0.0.1:3000")
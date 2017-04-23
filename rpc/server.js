/*
* @Author: nurulnabi
* @Date:   2017-04-22 13:49:39
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-23 20:07:56
*/

var  dnode = require('dnode');
var utility = require('./functions');
var server = dnode(utility);
console.log(dnode.listen);
console.log(server);

server.listen(5003);
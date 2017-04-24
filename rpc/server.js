/*
* @Author: nurulnabi
* @Date:   2017-04-22 13:49:39
* @Last Modified by:   noor
* @Last Modified time: 2017-04-24 14:45:19
*/

var  dnode = require('dnode');
var utility = require('./functions');
var server = dnode(utility);

server.listen(5003);
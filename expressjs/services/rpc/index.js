/*
* @Author: nurulnabi
* @Date:   2017-04-23 18:25:59
* @Last Modified by:   noor
* @Last Modified time: 2017-04-24 11:12:27
*/

var dnode = require('dnode');
var functions = require('./functions');
var servers = require('../../config/servers');

var d = dnode.connect(5004);

module.exports = function(app, next){
	var procedures = functions(app);
	d.on('remote', function(remote){
		console.log(remote);
		next(remote)
	})
}
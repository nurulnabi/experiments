/*
* @Author: nurulnabi
* @Date:   2017-04-23 18:25:59
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-23 18:37:32
*/

var dnode = require('dnode');

var d = dnode.connect(5004);

module.exports = function(next){
	d.on('remote', function(remote){
		console.log(remote);
		next(remote)
	})
}
/*
* @Author: nurulnabi
* @Date:   2017-04-23 20:12:12
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-24 02:02:12
*/

var ursa = require('ursa');
var keyPrivate = require('../../../config/privateKey.js')['key'];
var keyPublic = require('../../../config/publicKey.js');
var config = require('../../../config/globalValues.js');


var privateKey = ursa.createPrivateKey(keyPrivate);

var crypto = function(app){
	this.app = app;
};

crypto.prototype.encrypt = function(data, serverId){
	var key = this.app.getValue("publicKey")[serverId];
	if(!key){
		return undefined;
	}

	data = JSON.stringify(data);
	var publicKey = ursa.createPublicKey(key);
	var buf = publicKey.encrypt(data, config.encoding, config.base);
	var sig = privateKey.hashAndSign(config.algorithm, encrptd)
	return { buf: buf, sig:sig };
};

crypto.prototype.decrypt = function(buffer,signature, serverId){
	var key = this.app.getValue("publicKey")[serverId];
	if(!key){
		return undefined;
	}

	var publicKey = ursa.createPublicKey(key);
	var sig = publicKey.hashAndVerify(config.algorithm, buffer, signature);
	return sig ? privateKey.decrypt(buffer, config.base, config.encoding) : undefined;
};

module.exports = function(app){
	return new crypto(app);
}
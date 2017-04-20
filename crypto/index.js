/*
* @Author: noor
* @Date:   2017-04-19 12:15:25
* @Last Modified by:   noor
* @Last Modified time: 2017-04-19 17:07:30
*/

var ursa = require('ursa');
var keys = require('./keys');

var prvkey = ursa.createPrivateKey(keys.prvkey);
var pubkey = ursa.createPublicKey(keys.pubkey);

var msg = "Hello there!"
var encrptd = pubkey.encrypt(msg, 'utf8', 'base64')
var dencrptd = prvkey.decrypt(encrptd, 'base64', 'utf8')

console.log(encrptd);
console.log(dencrptd);

encrptd = prvkey.hasAndSign('sha256', msg, 'utf8', 'base64')
decrptd = pubkey.hasAndVerify('sha256', encrptd, )



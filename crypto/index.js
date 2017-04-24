/*
* @Author: noor
* @Date:   2017-04-19 12:15:25
* @Last Modified by:   noor
* @Last Modified time: 2017-04-24 10:35:41
*/

var ursa = require('ursa');
var keys = require('./keys');

var prvkey1 = ursa.createPrivateKey(keys.prvkey1);
var prvkey2 = ursa.createPrivateKey(keys.prvkey2);
var pubkey1 = ursa.createPublicKey(keys.pubkey1);
var pubkey2 = ursa.createPublicKey(keys.pubkey2);

// var msg = ['noor']
var msg = JSON.stringify(['noor','ansari']);
var encrptd = pubkey2.encrypt(msg, 'utf8', 'base64')
// var sbuf = prvkey1.privateEncrypt(encrptd, 'utf8', 'base64')//, 'base64', 'utf8')

// console.log(encrptd);
// console.log(dencrptd);

// decrptd = pubkey.publicDecrypt(encrptd,'base64','utf8' )
// msg = prvkey.decrypt(dencrptd,'base64','utf8' )

// msg2 = prvkey.decrypt(encrptd,'base64', 'utf8')

// var msg2 = pubkey1.publicDecrypt(sbuf, 'base64', 'utf8')
var msg2 = prvkey2.decrypt(encrptd, 'base64', 'utf8')
// var status = pubkey.hashAndVerify('sha512', encrptd, sbuf)
// console.log(msg2);
console.log(msg2, JSON.parse(msg2));
// console.log(status);
// console.log(msg2);
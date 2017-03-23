/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-15 11:57:44
* @Last Modified by:   noor
* @Last Modified time: 2017-02-15 11:57:48
*/

for (var i = 0; i < 1024 * 1024; i++) {
  process.nextTick(function () { Math.sqrt(i) } )
}
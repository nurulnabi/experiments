/*
* @Author: noor
* @Date:   2017-04-21 13:26:54
* @Last Modified by:   noor
* @Last Modified time: 2017-04-21 13:33:55
*/

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  console.log(pos);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
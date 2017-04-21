/*
* @Author: noor
* @Date:   2017-04-21 11:02:12
* @Last Modified by:   noor
* @Last Modified time: 2017-04-21 11:03:15
*/

var sessionService = require('../services/session/sessionService');
var Channel = require('../services/channel/channel');
var filter = require('../services/filter/filter');

module.exports = function(app){
	//put the sessionService in the app to utilize it
	app.sessionService = sessionService();

	//set the channel in the app
	app.channelService = Channel(app);

	//use the filter to plug the userId
	var filterInstance = filter();
	app.use(filterInstance.plugUserId.bind(app));
}
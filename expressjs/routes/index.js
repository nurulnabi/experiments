var express  = require('express');
var router   = express.Router();
var response = require('./config/messages');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/data', function(req, res, next){
	res.send("<h1> Hello There</h1>")
})

router.post('/data', function(req, res, next){
	console.log(req.body);
	res.send("this post response")
})

router.post("/login", function(req, res, next){
	var user = req.body;
	if(user.pwdChangeRequired){
		res.json(response.pwdChangeRequired.addKeyValue('pwdChangeRequired', true));
		return;
	}
	if(user.accountLocked){
		res.json(response.accountLocked.addKeyValue('accountLocked', true));
		return;
	}
})

module.exports = router;

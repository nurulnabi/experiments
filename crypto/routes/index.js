var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/data', function(req, res){
	var data = req.body.data;
	res.send("you sent: ");
})

module.exports = router;

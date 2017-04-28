/*
* @Author: noor
* @Date:   2017-04-27 17:15:15
* @Last Modified by:   noor
* @Last Modified time: 2017-04-28 12:50:15
*/


module.exports = function(app){
	
};



var checkEmailAndPassword = function(app){
	var User = app.dbQuery;
	app.use("/login", function(req, res, next){
		var email = req.body.email;
		User.getUserByEmail(email)
			.then(function(user){
				
				req.body.user = user;
				if(!user){
					return reject();
				}
				if(user.accountLocked){
					return reject()
				}
				if(user.deActivateAccount){
					return reject();
				}

				user.comparePassword(req.body.password, function(err, success){
					if(success){
						req.body.loginSuccess = true;
						updateLoginAttempt(app);
						return next();
					}
					return reject();
				});
			})
			.catch(function(err){
				req.body.loginSuccess = false;
				updateLoginAttempt(app);
				next();
			})
	})
};

var updateLoginAttempt = function(app){
	var User = app.dbQuery;
	var time = new Date().getTime();
	var nextTime = time+24*60*60*1000;
	if(!loginSuccess){
		User.loginAttempt(req.body.user._id, nextTime)
			.then(function(res){
				return next();
			});
	}else{
		User.loginAttempt(req.body.user._id, time)
			.then(function(){
				return next();
			})
	}
};

var checkUsualLoginState = function(app){
	app.use("/login", function(req, res, next){
		var user = req.body.user;
		if(user.accountLocked || user.deActivateAccount){
			return next();
		}
		user.forEach(function(state){
			if(state !== req.body.state){
				req.body.pwdChangeRequired = true;
			}
		})
		next();
	})
};

var invalidLoginAttempts = function(app){
	var User = app.dbQuery;
	app.use("/login", function(req, res, next){
		if(req.body.user.invalidLoginAttempts >= 3){}
	})
}

// eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('8 7={"6":5,"4":"3 2","1":"0"};',9,9,'Desktop|form_factor|Firefox|Mozilla|complete_device_name|false|is_mobile|WURFL|var'.split('|'),0,{}))

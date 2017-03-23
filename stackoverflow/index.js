/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-02 11:04:16
* @Last Modified by:   noor
* @Last Modified time: 2017-03-02 13:21:14
*/

/* POST Register User  */
 router.post('/register',function(req,res,next){

let user = req.body;
//checking for empty field in a form
for(let key in user){
   if(user[key] === ""){
      return next(mid.error("All fields are required to fill"));
   }
}
	//save data in object
	let userData = {
	   username : user.username,
	   email    : user.email,
	   password : user.password
	 };

	 var allPromises = [];
	 allPromises.push(findUserByName(user.name));
	 allPromises.push(findUserByEmail(user.email));
	 allPromises.push(userCreate(userData));

	 Promise.all(allPromises).then(function(res){
	 	// everything gone well, meaning user created
	 })
	 .catch(function(err){
	 	//this will be caused when any of the operation failed, corresponding error will be in the err
	 })



	  /*//promise chaining
	 	findUserByName(user.name).then(function(res){	
	 		//no user found with this name
	 		return findUserByEmail(user.email);
	 	},function(err){
	 		// user found with name err or callback
	 	})
	 	.then(function(res){	
	 		//no user with this email
	 		return userCreate(userData);
	 	},function(err){
	 		//user found with this email err or callback
	 	})
	 	.then(function(res){
	 		//user data saved
	 	}, function(err){
	 		//user data save failed
	 	})*/

 });

 var findUserByName = function(username){
 	return new Promise(function(resolve, reject){
 		User.findOne({email:user.email})
 		    .exec(function(err,user){
 		        if(err){
 		          reject("Something went wrong");
 		        }
 		        if(user){
 		           reject("Email already exist");
 		        }
 		        if(!user && !err){	//in case there is no user
 		        	resolve();
 		        }
 		    });
 	});
 };


 var findUserByEmail = function(email){
 	return new Promise(function(resolve, reject){
 		User.findOne({email:user.email})
 		    .exec(function(err,user){
 		        if(err){
 		           reject("Something went wrong");
 		        }
 		        if(user){
 		           reject("Email already exist");
 		        }
 		        if(!user && !err){
 		        	resolve();
 		        }
 		    });
 	});
 }


 var userCreate = function(userData){
 	return new Promise(function(resolve, reject){
 		 User.create(userData,function(err,user){
 		  if(err){
 		     reject("Something went wrong.Try again !!!");
 		   } else {
 		      req.session.userID = user._id;
 		      resolve();
 		   } 

 		});
 	});
 }
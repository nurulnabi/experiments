/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-20 11:03:51
* @Last Modified by:   noor
* @Last Modified time: 2017-02-20 14:47:57
*/

$(function(){
	var model = {
		currentCat: null,
		
		cats: [],

		init: function(){
			var cats = model.cats;
			for(var i=1; i<=5; i++){
				cats.push({
					name:"cat"+i,
					url:"cat"+i+".jpg",
					count:0
				});
			}
		},

		addCat:function(name,url){
			var obj 	= {};
			obj.name 	= name;
			obj.url 	= url;
			obj.count	= 0;
			cats.push(obj);
		},

		getAllCats: function(){
			return model.cats;
		},
	};

	var governer = {
		getAllCats: function(){
			return model.getAllCats();
		},

		setCurrentCat: function(cat){
			model.currentCat = cat;
		},

		getCurrentCat: function(){
			return model.currentCat;
		},

		increment: function(){
			var incr = document.getElementById("increment"); 
			var currentCat = this.getCurrentCat();
			currentCat.count = currentCat.count +1;
			incr.innerHTML = "Click Count = "+currentCat.count;
		},

		init: function(){
			model.init();
			view.initList();
			view.initCat();
		}
	};


	var view = {
		initList: function(){
			governer.getAllCats().forEach(function(cat){
				var elem = document.createElement("a");
				elem.href = "#!";
				elem.className = "collection-item";
				elem.id = cat.name;
				elem.innerHTML = cat.name;
				elem.onclick = function(){
					governer.setCurrentCat(cat);
					document.getElementById("cat").style.display = "block";
					document.getElementById("img").src = "images/"+cat.url;
					document.getElementById("name").innerHTML = cat.name;
					document.getElementById("increment").innerHTML = "Click Count = "+ cat.count;
				};
				document.getElementById("list").appendChild(elem);
			});
		},

		initCat: function(){
			document.getElementById("cat")
			.addEventListener("click",view.render);
		},

		render: function(){
			governer.increment();
		}

	};

	governer.init();

});
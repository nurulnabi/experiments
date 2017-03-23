/*
* @Author: nurulnabi
* @Date:   2017-02-12 02:16:01
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-02-17 23:43:05
*/

var Cats = function(catName,url){
	this.name = catName;
	this.url = url;
	this.count = 0;
}

cproto = Cats.prototype;

cproto.increment = function(){
	this.count = this.count+1;
	return this.count;
}

var catName = ["pussy","miranda","susi","mew","raisi"];
var catArr = [];
for(var key in catName){
	catArr.push(new Cats(catName[key],"cat"+ ++key +".jpg"));
}

//create the list of cats
for(var key in catArr){
	var elem = document.createElement("a");
	elem.href = "#!";
	elem.className = "collection-item";
	elem.id = catArr[key].name;
	elem.innerHTML = catArr[key].name;
	elem.cat = catArr[key];
	elem.onclick = function(){
		document.getElementById("cat").style.display = "block";
		document.getElementById("img").src = "images/"+this.cat.url;
		document.getElementById("name").innerHTML = this.cat.name;
		document.getElementById("increment").innerHTML = "Click Count = "+ this.cat.count;
	}
	document.getElementById("list").appendChild(elem);
}

function increment(){
	var incr = document.getElementById("increment"); 
	var name = document.getElementById("name").innerHTML;
	incr.innerHTML = "Click Count = "+getCat(name).increment();	
}

function getCat(name){
	for(var key in catArr){
		if(catArr[key].name == name){
			return catArr[key];
		}
	}
}

document.getElementById("cat")
.addEventListener("click",increment);
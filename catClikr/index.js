/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-02-17 17:52:20
* @Last Modified by:   noor
* @Last Modified time: 2017-02-17 19:38:26
*/

var cats = [
		{
			name:"cat1",
			url:"cat1.jpg",
			count:0
		},{
			name:"cat2",
			url:"cat2.jpg",
			count:0
		},{
			name:"cat3",
			url:"cat3.jpg",
			count:0
		},{
			name:"cat4",
			url:"cat4.jpg",
			count:0
		},{
			name:"cat5",
			url:"cat5.jpg",
			count:0
		},
	];

for(var key in cats){
	var cat = document.createElement("a");
	cat.href = "#!";
	cat.className = "collection-item";
	cat.id = cats[key].name
	cat.textContent = cats[key].name;
	cat.onclick = function(count){
					document.getElementById("img").src = "images/"+this.id+".jpg";
					document.getElementById("name").innerHTML = this.id;
					document.getElementById("count").innerHTML = count;
					document.getElementById("cat").style.display = "block";
				};
	document.getElementById("collection").appendChild(cat);
}

function increment(name){
	var name = document.getElementById("name").innerHTML;
	var cat;
	for(var key in cats){
		if(cats[key].name = name){
			cat = cats[key];
			break;
		}
	}
	document.getElementById("count").innerHTML = cat.count = cat.count+1;
}
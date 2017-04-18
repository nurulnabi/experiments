/*
* @Author: nurulnabi
* @Date:   2017-04-19 00:45:16
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-19 00:52:53
*/

import React from "react";

export default class Layout extends React.Component{
	constructor(){
		super();
		this.name = "ansari";
	}
	getVal(){
		return "noor";
	}

	render(){
		return(
			<h1>It's { this.getVal()+" "+ this.name}</h1>
		);
	}
}
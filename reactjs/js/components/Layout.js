/*
* @Author: nurulnabi
* @Date:   2017-04-19 00:45:16
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-19 02:13:28
*/

import React from "react";
import Header from "./header";
import Footer from "./footer";

export default class Layout extends React.Component{
	constructor(){
		super();
		this.state = { name: "Good!"}
	}

	render(){
		const msg = "Noor welcomes you!"
		setTimeout(function(that){
			that.setState({ name: "Nope!"})
		},1000,this)
		return(
			<div>
				{ this.state.name }
				<Header title={msg}/>
				<Footer />
			</div>
		);
	}
}
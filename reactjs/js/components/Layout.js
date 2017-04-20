/*
* @Author: nurulnabi
* @Date:   2017-04-19 00:45:16
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-19 23:25:38
*/

import React from "react";
import Header from "./header";
import Footer from "./footer";

export default class Layout extends React.Component{
	constructor(){
		super();
		this.state = { name: "Good!"}
	}
	
	changeTitle(title){
		this.setState({name:title});
	}

	render(){
		return(
			<div>
				<Header  changeTitle={this.changeTitle.bind(this)} title={this.state.name}/>
				<Footer />
			</div>
		);
	}
}
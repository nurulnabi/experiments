/*
* @Author: nurulnabi
* @Date:   2017-04-19 00:45:16
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-19 23:28:45
*/

import React from "react";
import Title from "./header/title"

export default class Header extends React.Component{
	handleChange(e){
		const title = e.target.value;
		this.props.changeTitle(title);
	}
	render(){
		return(
			<div>
				<Title title={this.props.title}/>
				<input value={this.props.title} onChange={this.handleChange.bind(this)} />
			</div>
		);
	}
}
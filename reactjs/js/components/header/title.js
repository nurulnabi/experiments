/*
* @Author: nurulnabi
* @Date:   2017-04-19 00:45:16
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-19 02:09:12
*/

import React from "react";

export default class Title extends React.Component{
	render(){
		return(
			<h1>{this.props.title}</h1>
		);
	}
}
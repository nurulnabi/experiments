/*
* @Author: nurulnabi
* @Date:   2017-04-19 00:45:16
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-19 02:09:17
*/

import React from "react";
import Title from "./header/title"

export default class Header extends React.Component{
	render(){
		return(
			<Title title={this.props.title}/>
		);
	}
}
/*
* @Author: nurulnabi
* @Date:   2017-04-15 00:38:21
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-19 00:40:38
*/

import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component{
	getVal(){
		return "noor";
	}

	render(){
		return(
			<h1>It's { this.getVal()}</h1>
		);
	}
}

const app = document.getElementById("app");
ReactDOM.render(<Layout/>,app)
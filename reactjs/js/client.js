/*
* @Author: nurulnabi
* @Date:   2017-04-15 00:38:21
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-15 00:42:56
*/

import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component{
	render(){
		return(
			<h1>It's Working!</h1>
		);
	}
}

const app = document.getElementById("app");
ReactDOM.render(<Layout/>,app)
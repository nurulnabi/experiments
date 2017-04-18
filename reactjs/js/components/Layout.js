/*
* @Author: nurulnabi
* @Date:   2017-04-19 00:45:16
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-04-19 01:27:22
*/

import React from "react";
import Header from "./header";
import Footer from "./footer";

export default class Layout extends React.Component{
	render(){
		return(
			<div>
				<Header />
				<Footer />
			</div>
		);
	}
}
import React, { Component } from 'react';

class QuoteSettingBtn extends Component{

	render(){
		return(
				<li><i className="fa fa-pencil" onClick={this.handleClickSetting}></i></li>
		);
	}
}

export default QuoteSettingBtn;
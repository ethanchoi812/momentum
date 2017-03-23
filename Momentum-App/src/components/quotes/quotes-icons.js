import React, { Component } from 'react';
import QuoteTweet from './quotes-tweet.js';
import QuoteSettingBtn from './quotes-settingbtn.js'

class QuoteIcons extends Component{

	render(){
		return(
			<ul className="quoteIcons">
				<QuoteTweet />
				<QuoteSettingBtn />
			</ul>
		);
	}
}

export default QuoteIcons;
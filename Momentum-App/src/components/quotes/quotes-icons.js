import React, { PropTypes } from 'react';

const QuoteIcons = props => {

		return(
			<ul className="quoteIcons">
				<li><i className="fa fa-lg fa-twitter" onClick={props.tweetQuote}></i></li>
				<li><i className="fa fa-lg fa-pencil" onClick={props.toggleQuoteSettings}></i></li>
			</ul>
		);
	}

QuoteIcons.propTypes = {
	tweetQuote: React.PropTypes.func,
	toggleQuoteSettings: React.PropTypes.func,
}

export default QuoteIcons;
import React, { Component } from 'react';

class QuoteRow extends Component {
	render(){

		const text = this.props.quote.text;
		const author = this.props.quote.author;

	return(
			<li className="quoteListItem">
	      		<span className="sentenceItem">{text}</span>
	      		&nbsp;
	      		<span className="authorItem">{author}</span>
	      		&nbsp;
	      		<i className="fa fa-times deleteQuote"></i>
	      	</li>		
		);
	}
}

export default QuoteRow;
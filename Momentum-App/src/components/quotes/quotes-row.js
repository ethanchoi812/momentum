import React, { Component } from 'react';

class QuoteRow extends Component {
	render(){

		const text = this.props.quote.text;
		const author = this.props.quote.author;

	return(
			<li className="quoteListItem" key={text}>
	      		<span className="sentenceItem">{text}</span>
	      		&nbsp;
	      		<span className="authorItem">{author}</span>
	      	</li>		
		);
	}
}

export default QuoteRow;
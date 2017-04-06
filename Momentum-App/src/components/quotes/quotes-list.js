import React, { Component } from 'react';
import QuoteRow from './quotes-row.js';


class QuoteList extends Component {


	render(){
		const quoteArray = this.props.quoteArray;
		const quotelistItems = quoteArray.map((quote) =>
			<QuoteRow quote={quote} key={quote.text} removeQuote={(removeQuote) => this.props.handleRemoveQuote(removeQuote, quote)}/>	
			)

	return(
		<div className="quoteWidgetRow">
			<ul className="quoteList">
	      		{quotelistItems}	
      		</ul>
      	</div>
		);
	}
}

export default QuoteList;
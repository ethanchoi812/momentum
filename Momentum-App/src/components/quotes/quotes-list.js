import React, { Component } from 'react';
import QuoteRow from './quotes-row.js';

class QuoteList extends Component {

	render(){
		const rows=[];
		this.props.quoteArray.forEach(function(quote){
			rows.push(<QuoteRow key={quote.text} quote={quote}/>);
		});

	return(
		<div className="quoteWidgetRow">
			<ul className="quoteList">
	      		{rows}
      		</ul>
      	</div>
		);
	}
}

export default QuoteList;
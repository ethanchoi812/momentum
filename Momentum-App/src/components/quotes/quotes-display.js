import React, { Component } from 'react';

class DisplayQuotes extends Component {

	render(){

	const i = this.props.quoteArray.length;
	const d = new Date();
	const n = (d.getDate())%i;

	return(
	<div className="displayQuoteDiv">
  		<p className="quoteSentence">{this.props.quoteArray[n].text}</p>
  		<p className="quoteAuthor">{this.props.quoteArray[n].author}</p>
  	</div>

  		);
	}
}

export default DisplayQuotes;
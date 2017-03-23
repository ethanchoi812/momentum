import React, { Component } from 'react';
import initialQuoteArray from './quotes-array.js';
import QuoteIcons from './quotes-icons.js';

const mainQuoteArray = JSON.parse(localStorage.getItem('updateQuoteArray')) || initialQuoteArray;

class QuotesContainer extends Component {

	constructor(props) {    
    super(props);
    this.state = {quoteArr:mainQuoteArray};  
	}

	render(){
	const quoteArray = this.state.quoteArr;
	const i = quoteArray.length;
	const d = new Date();
	const n = (d.getDate())%i;

	return(
	<div className="displayQuoteDiv">
  		<p className="quoteSentence">{quoteArray[n].text}</p>
  		<p className="quoteAuthor">{quoteArray[n].author}</p>
  		<QuoteIcons />
  	</div>

  		);
	}
}

export default QuotesContainer;
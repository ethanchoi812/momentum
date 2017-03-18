import React, { Component } from 'react';
import { initialQuoteArray } from './quotes-array.js';

const mainQuoteArray = JSON.parse(localStorage.getItem('updateQuoteArray')) || initialQuoteArray;

class QuotesContainer extends Component {

	constructor(props) {    
    super(props);
    this.state = {quoteArr:mainQuoteArray};  
	}

	render(){
	const quoteArr = this.state.quoteArr;
	const i = quoteArr.length;
	const d = new Date();
	const n = (d.getDate())%i;

	return(
	<div className="displayQuoteDiv">
  		<p className="quoteSentence">{quoteArr[n].text}</p>
  		<p className="quoteAuthor">{quoteArr[n].author}</p>
  	</div>

  		);
	}
}

export default QuotesContainer;
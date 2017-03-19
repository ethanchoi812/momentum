
import React, { Component } from 'react';
import GetQuote from './quotes-getquote.js';
import QuoteList from './quotes-list.js';
import { initialQuoteArray } from './quotes-array.js';

//import './quotes.css';

const mainQuoteArray = JSON.parse(localStorage.getItem('updateQuoteArray')) || initialQuoteArray;

class QuotesSettings extends Component {

	constructor(props) {    
    super(props);
    this.handleSubmitQuote = this.handleSubmitQuote.bind(this);
    this.state = {quoteArr:mainQuoteArray};  
	}


	handleSubmitQuote(newQuote) {
		event.preventDefault();
		const newArray = this.state.quoteArr.slice();
    	newArray.unshift(newQuote);
	    localStorage.setItem('updateQuoteArray', JSON.stringify(newArray));
		this.setState({quoteArr:newArray});
		}

	render(){
	const quoteArr = this.state.quoteArr;

	return(
		<div>
		<div className="quoteWidgetDiv">
	  		<GetQuote onSubmitNewQuote={this.handleSubmitQuote}/>
	  		<QuoteList quoteArray={quoteArr}/>
	  	</div>
	  	</div>
  		);
	}
}

export default QuotesSettings;
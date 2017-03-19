
import React, { Component } from 'react';
import DisplayQuotes from './quotes-display.js';
import GetQuote from './quotes-getquote.js';
import QuoteList from './quotes-list.js';
//import './quotes.css';

const initialQuoteArray = [
		{text: "Without new experiences, something inside of us sleeps. The sleeper must awaken.",
		author: "Frank Herbert"},
		{text: "Life has no limitations, except the ones you make.",
		author: "Les Brown"},
		{text: "Go forth and make awesomeness.",
		author: "Unknown"},
		{text: "One day you will wake up and there won't be any more time to do the things you've always wanted. Do it now.", 
		author: "Paulo Coelho"},
		{text: "Forget all the reasons why it won't work and believe the one reason why it will.", 
		author: "Unknown"},
		{text: "Nothing is so fatiguing as the eternal hanging on of an uncompleted task.",
		author: "William James"},
		{text: "Don't let yesterday use up too much of today.",
		author:"Will Rogers"},
		{text:"Don't let the noise of others' opinions drown out your own inner voice. Have the courage to follow your own heart and intuition.",
		author:"Steve Jobs"},
		{text:"If it ain't fun, don't do it.",
		author:"Jack Canfield"},
		{text: "We tend to judge others by their behavior, and ourselves by our intentions.",
		author: "Unknown"}
	];

const mainQuoteArray = JSON.parse(localStorage.getItem('updateQuoteArray')) || initialQuoteArray;

class Quotes extends Component {

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
		<div><DisplayQuotes quoteArray={quoteArr}/></div>
		<div className="quoteWidgetDiv">
	  		<GetQuote onSubmitNewQuote={this.handleSubmitQuote}/>
	  		<QuoteList quoteArray={quoteArr}/>
	  	</div>
	  	</div>
  		);
	}
}

export default Quotes;
import React, { Component } from 'react';
import './quotes.css'

class DisplayQuotes extends Component {
	render(){

	const d = new Date();
	const n = (d.getDate() - 1)%10;

	return(
	<div className="displayQuoteDiv">
  		<p className="quoteSentence">{this.props.quoteArray[n].text}</p>
  		<p className="quoteAuthor">{this.props.quoteArray[n].author}</p>
  	</div>

  		);
	}
}

class GetQuote extends Component {
	constructor(props) {
    super(props);
    this.state={
    	text:'',
    	author:''
    };


    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(event) {

   this.setState({
   	text:event.target.value,
  });
}

  handleAuthorChange(event) {

   this.setState({
   	author:event.target.value
  });
}

  handleSubmit(event) {
  	event.preventDefault();

	if(this.state.text){

		const newQuote = {
	    	text:this.state.text,
	    	author:this.state.author
    	}

	    this.state={
	    	text:"",
	    	author:""
	    };

		this.props.onSubmitNewQuote(newQuote);
		}

	this.reset();

	}
  
	render(){
		
	return (
      <form className="addQuotes" onSubmit={this.handleSubmit}>
      <label>
      	Quote:
        <input type="text" name="quoteText" value={this.state.text} placeholder="Quote here" onChange={this.handleTextChange}/>
        </label>
      <label>
        Author:
        <input type="text" name="quoteAuthor" value={this.state.author} placeholder="Author name" onChange={this.handleAuthorChange}/>
        </label>
          <input type="submit" value="Submit"/>
      </form>
	    );
	}
}

class QuoteRow extends Component {
	render(){

		const text = this.props.quote.text;
		const author = this.props.quote.author;

	return(
			<li className="quoteListItem">
	      		<span className="sentenceItem">{text}</span>
	      		&nbsp;
	      		<span className="authorItem">{author}</span>
	      	</li>		
		);
	}
}

class QuoteList extends Component {

	render(){
		const rows=[];
		this.props.quoteArray.forEach(function(quote){
			rows.push(<QuoteRow quote={quote}/>);
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
	
	handleSubmitQuote(userQuote) {
		event.preventDefault();

    	const newArray = this.state.quoteArr.slice();
    	newArray.unshift(userQuote);
	    localStorage.setItem('updateQuoteArray', JSON.stringify(newArray));
		this.setState({quoteArr:newArray});
		}

	render(){	
		const quoteArr = this.state.quoteArr;
		return(
		<div className="quoteWidgetDiv">
			<DisplayQuotes quoteArray={quoteArr} />
			<GetQuote onSubmitNewQuote={this.handleSubmitQuote}/>
			<QuoteList quoteArray={quoteArr}/>
		</div>
		);
	}
}

export default Quotes;
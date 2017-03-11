import React, { Component } from 'react';
import './quotes.css'

class DisplayQuotes extends Component {
	render(){

	var d = new Date();
	var n = (d.getDate() - 1)%10;

	return(
	<div className="displayQuoteDiv">
  		<p className="quoteSentence">{this.props.quoteArray[n].line}</p>
  		<p className="quoteAuthor">{this.props.quoteArray[n].author}</p>
  	</div>

  		);
	}
}

class GetQuote extends Component {
	constructor(props) {
    super(props);
    this.state={
    	line:'',
    	author:''
    };

    this.handleLineChange = this.handleLineChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLineChange(event) {

   this.setState({
   	line:event.target.value,
  });
}

  handleAuthorChange(event) {

   this.setState({
   	author:event.target.value
  });
}

  handleSubmit(event) {
  	
    const newQuote = {
    	line:this.state.line,
    	author:this.state.author
    }

    console.log(newQuote);
    this.props.onSubmitNewQuote(newQuote);
    event.preventDefault();
 }   
  
	render(){
		
	return (
      <form onSubmit={this.handleSubmit}>
      <label>
      	Quote:
        <input type="text" value={this.state.line} placeholder="Quote here" onChange={this.handleLineChange}/>
        </label>
      <label>
        Author:
        <input type="text" value={this.state.author} placeholder="Author name" onChange={this.handleAuthorChange}/>
        </label>
          <input type="submit" value="Submit"/>
      </form>
	    );
	}
}

class QuoteRow extends Component {
	render(){

		var line = this.props.quote.line;
		var author = this.props.quote.author;

	return(
			<li key={author} className="quoteListItem">
	      		<span className="sentenceItem">{line}</span>
	      		&nbsp;
	      		<span className="authorItem">{author}</span>
	      	</li>		
		);
	}
}

class QuoteList extends Component {
	render(){
		var rows=[];
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

var initialQuoteArray = [
		{line: 'Without new experiences, something inside of us sleeps. The sleeper must awaken.',
		author: 'Frank Herbert'},
		{line: 'Life has no limitations, except the ones you make.',
		author: 'Les Brown'},
		{line: 'Go forth and make awesomeness.',
		author: 'Unknown'},
		{line: 'One day you will wake up and there won'+ String.fromCharCode(39) +'t be any more time to do the things you'+ String.fromCharCode(39) +'ve always wanted. Do it now.', 
		author: 'Paulo Coelho'},
		{line: 'Forget all the reasons why it won'+ String.fromCharCode(39) +'t work and believe the one reason why it will.', 
		author: 'Unknown'},
		{line: 'Nothing is so fatiguing as the eternal hanging on of an uncompleted task.',
		author: 'William James'},
		{line: 'Don'+ String.fromCharCode(39) +'t let yesterday use up too much of today.',
		author:'Will Rogers'},
		{line:'Don'+ String.fromCharCode(39) +'t let the noise of others'+ String.fromCharCode(39) +' opinions drown out your own inner voice. Have the courage to follow your own heart and intuition.',
		author:'Steve Jobs'},
		{line:'If it ain'+ String.fromCharCode(39) +'t fun, don'+ String.fromCharCode(39) +'t do it.',
		author:'Jack Canfield'},
		{line: 'We tend to judge others by their behavior, and ourselves by our intentions.',
		author: 'Unknown'}
	];

class QuoteWidget extends Component {
	constructor(props) {
    super(props);
    this.handleSubmitQuote = this.handleSubmitQuote.bind(this);
    this.state = {quoteArr:initialQuoteArray};
  } 
	
	handleSubmitQuote(userQuote) {

    const newArray = this.state.quoteArr.slice();    
    newArray.push(userQuote);
    console.log(userQuote);
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
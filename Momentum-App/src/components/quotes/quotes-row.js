import React, { Component } from 'react';

class QuoteRow extends Component {

	constructor(props){
		super(props);
		this.handleRemoveQuote = this.handleRemoveQuote.bind(this);
	}

	handleRemoveQuote(){
		this.props.removeQuote({
			removeQuote:true
			});
	}

	render(){

		const text = this.props.quote.text;
		const author = this.props.quote.author;

	return(
			<li className="quoteListItem">
				<div className="quoteItem">
		      		<span className="sentenceItem">{text}</span>
		      		&nbsp;
		      		<span className="authorItem">{author}</span>
		      	</div>
	      		<div className="deleteQuote">
					<i onClick={this.handleRemoveQuote} className="fa fa-times"></i>
				</div>
	      	</li>		
		);
	}
}


export default QuoteRow;
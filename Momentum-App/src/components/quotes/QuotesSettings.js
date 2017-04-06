
import React, { Component } from 'react';
import GetQuote from './quotes-getquote.js';
import QuoteList from './quotes-list.js';
import initialQuoteArray from './quotes-array.js';

class QuotesSettings extends Component {

	constructor(props) {    
    super(props);
    this.state = {
    	quoteArr:initialQuoteArray,
    	};  

    this.handleSubmitQuote = this.handleSubmitQuote.bind(this);
    this.handleRemoveQuote = this.handleRemoveQuote.bind(this);
    this.closeQuoteSettings = this.closeQuoteSettings.bind(this);
	}

	componentDidMount(){
        const component = this;
        window.chrome.storage.sync.get("quoteArr", function(data){
        //console.log(data.quoteArr);
       	component.setState({
       		quoteArr:data.quoteArr  === undefined ? initialQuoteArray : data.quoteArr});
        });
    }

	handleSubmitQuote(newQuote) {
		event.preventDefault();
		const newArray = this.state.quoteArr.slice();
    	newArray.unshift(newQuote);
		this.setState({quoteArr:newArray});
		window.chrome.storage.sync.set({"quoteArr": newArray});
	}

	handleRemoveQuote(removeQuote, quote){
		event.preventDefault();

		const exQuote = quote;
		const newArray = this.state.quoteArr.slice();
		const idx = newArray.indexOf(exQuote);

		if((removeQuote.hasOwnProperty('removeQuote')) && idx > -1){
			newArray.splice(idx, 1);
		}

		this.setState({quoteArr:newArray});
		window.chrome.storage.sync.set({"quoteArr": newArray});
	}

	closeQuoteSettings(event){

		this.props.closeQuoteSettings();
	}

	render(){
	const quoteArr = this.state.quoteArr;

	return(
		<div className="quoteWidgetDiv" >
			<i className="fa fa-lg fa-times closeSetting" onClick={this.closeQuoteSettings}></i>
	  		<GetQuote onSubmitNewQuote={this.handleSubmitQuote}/>
	  		{ quoteArr.length > 0 ?
	  			<QuoteList quoteArray={quoteArr} handleRemoveQuote={this.handleRemoveQuote}/> :
	  			<div className="noQuotesYet"><p>No quotes yet! Add your own quote above.</p></div> }
	  	</div>
  		);
	}
}

export default QuotesSettings;
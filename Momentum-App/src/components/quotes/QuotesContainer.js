import React, { Component } from 'react';
import initialQuoteArray from './quotes-array.js';
import QuoteIcons from './quotes-icons.js';
import QuoteSettings from './QuotesSettings.js';


class QuotesContainer extends Component {

	constructor(props) {    
    super(props);
    this.state = {
    	quoteArr:initialQuoteArray,
    	showIcons:false,
    	showQuoteSetting:false,
    	quoteToday:"",
    	authorToday:"",
    	};  

    this.handleHover = this.handleHover.bind(this);
    this.toggleQuoteSettings = this.toggleQuoteSettings.bind(this);
    this.closeQuoteSettings = this.closeQuoteSettings.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
	}

	componentDidMount(){
        const component = this;
        window.chrome.storage.sync.get("quoteArr", function(data){
        	//console.log(data);
            component.setState({
            	quoteArr: data.quoteArr === undefined ? initialQuoteArray : data.quoteArr });
        });

        const quoteArray = this.state.quoteArr;
		const i = quoteArray.length;
		const d = new Date();
		const n = (d.getDate())%i;

		this.setState({
			quoteToday: quoteArray[n].text,
			authorToday: quoteArray[n].author
		});
    }

	handleHover(event){
		this.setState((prevState) => {
			return {showIcons: !prevState.showIcons};
		})
	}

	tweetQuote(event){

		const tweet = {
	    	text:this.state.quoteToday,
	    	author:this.state.authorToday
	    }

	    const tweetUrl ="https://twitter.com/intent/tweet?text=%22" + tweet.text + "%22%20" + tweet.author;
	    const l = (screen.width / 2) - 272.5;
	    const t = (screen.height / 2) - 210;
		window.open(tweetUrl, "share", "left=" + l + ",top=" + t + ",width=545,height=420,resizeable=0");

	}

	toggleQuoteSettings(event){
		this.setState((prevState) => {
			return {showQuoteSetting: !prevState.showQuoteSetting};
		})
	}

	closeQuoteSettings(){
		this.setState((prevState) => {
			return {showQuoteSetting: !prevState.showQuoteSetting};
		})
	}
	
	render(){
		const quoteArr = this.state.quoteArr;
		const quoteToday = this.state.quoteToday;
		const authorToday = this.state.authorToday;
		const showIcons = this.state.showIcons;
		const showQuoteSetting = this.state.showQuoteSetting;
		const closeQuoteSettings = this.state.closeQuoteSettings;

		return(
		<div className="quoteContainerDiv">
			{showQuoteSetting ? <QuoteSettings quoteArray={quoteArr} closeQuoteSettings={this.closeQuoteSettings} /> : null }
			<div className="displayQuoteDiv" onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
		  		<p className="quoteSentence">{quoteToday}</p>
		  		<p className="quoteAuthor">{authorToday}</p>
		  	{showIcons ? 
		  			<QuoteIcons showIcons={showIcons} tweetQuote={this.tweetQuote} toggleQuoteSettings={this.toggleQuoteSettings} />
		  			:  null }
		  	</div>
	  	</div>

	  		);
		}
	}

export default QuotesContainer;
import React, { Component } from 'react';

class QuoteTweet extends Component{
	 constructor(props) {
	    super(props);
	    this.state = {
	    	quote:"",
	    	author:"",
	    };


	    this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event){
		event.preventDefault();

		const tweetQuote = {
	    	text:this.props.quoteArr.text,
	    	author:this.props.quoteArr.author,
	    }

	    const tweetUrl ="https://twitter.com/intent/tweet?text=%22" + tweetQuote.text + "%22%20" + tweetQuote.author;
	    const l = (screen.width / 2) - 272.5;
	    const t = (screen.height / 2) - 210;
		 window.open(tweetUrl, "share", "left=" + l + ",top=" + t + ",width=545,height=420,resizeable=0");
	}


	render(){
		return(
				<li>
					<a className="twitter-share-button" href={this.state.tweet} onClick={this.handleClick} target="_blank">
  						<i className="fa fa-lg fa-twitter"></i>
  					</a>
				</li>
		);
	}
}

export default QuoteTweet;
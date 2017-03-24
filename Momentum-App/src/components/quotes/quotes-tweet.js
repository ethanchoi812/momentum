import React, { Component } from 'react';

class QuoteTweet extends Component{
	 constructor(props) {
	    super(props);
	    this.state = {
	    	tweet:"",
	    	quote:"",
	    	author:"",
	    };

	    this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event){
		event.preventDefault();
		this.setState({
			quote: this.props.quoteArr.text,
			author: "-" + this.props.quoteArr.author ? this.props.quoteArr.author : "Unknown", 
			tweet:"https://twitter.com/intent/tweet?text=",
		});
	}


	render(){
		return(
				<li>
					<a className="twitter-share-button" href={this.state.tweet} onClick={this.handleClick} target="_blank">
  						<i className="fa fa-twitter"></i>
  					</a>
				</li>
		);
	}
}

export default QuoteTweet;
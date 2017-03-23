import React, { Component } from 'react';

class QuoteTweet extends Component{
	 /*constructor(props) {
	    super(props);
	    this.props.state = {
	    	text:"",
	    	author:"",
	    	quote:text + author,
	    };
	}*/

	render(){
		return(
				<li>
					<a className="twitter-share-button" href="https://twitter.com/intent/tweet?text={quote}">
  						<i className="fa fa-twitter"></i>
  					</a>
				</li>
		);
	}
}

export default QuoteTweet;
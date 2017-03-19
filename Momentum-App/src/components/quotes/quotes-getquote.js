import React, { Component } from 'react';

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

//	this.reset();

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

export default GetQuote;
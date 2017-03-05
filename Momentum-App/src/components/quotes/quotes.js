import React, { Component } from 'react';
import './quotes.css'

class Quotes extends Component {
render(){
	var quotesList = [
	{sentence: 'Without new experiences, something inside of us sleeps. The sleeper must awaken.', author: 'Frank Herbert'},
	{sentence: 'Life has no limitations, except the ones you make.', author: 'Les Brown'},
	{sentence: 'Go forth and make awesomeness.', author: 'Unknown'},
	{sentence: 'One day you will wake up and there won&#39;t be any more time to do the things you&#39;ve always wanted. Do it now.', author: 'Paulo Coelho'},
	{sentence: 'Forget all the reasons why it won&#39t work and believe the one reason why it will.', author: 'Unknown'},
	{sentence: 'Nothing is so fatiguing as the eternal hanging on of an uncompleted task.', author: 'William James'},
	{sentence: 'Don&#39;t let yesterday use up too much of today.', author:'Will Rogers'},
	{sentence:'Don&#39;t let the noise of others&#39; opinions drown out your own inner voice. Have the courage to follow your own heart and intuition.', author:'Steve Jobs'},
	{sentence:'If it ain&#39;t fun, don&#39;t do it.', author:'Jack Canfield'},
	{sentence: 'We tend to judge others by their behavior, and ourselves by our intentions.', author: 'Unknown'}
	];

	var d = new Date();
	var n = (d.getDate() - 1)%10;

	return(
	<div className="quoteDiv">
  		<p className="quoteSentence">{quotesList[n].sentence}</p>
  		<p className="quoteAuthor">{quotesList[n].author}</p>
  	</div>

  		);
	}
}

export default Quotes;
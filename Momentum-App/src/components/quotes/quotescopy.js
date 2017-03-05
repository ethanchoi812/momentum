import React, { Component } from 'react';
import './quotes.css'



	var quotesList = [
	{sentence: 'Without new experiences, something inside of us sleeps. The sleeper must awaken.', author: 'Frank Herbert'},
	{sentence: 'Life has no limitations, except the ones you make.', author: 'Les Brown'},
	{sentence: 'Go forth and make awesomeness.', author: 'Unknown'},
	{sentence: 'One day you will wake up and there won&#39t be any more time to do the things you&#39ve always wanted. Do it now.', author: 'Paulo Coelho'},
	{sentence: 'Forget all the reasons why it won&#39t work and believe the one reason why it will.', author: 'Unknown'},
	{sentence: 'Nothing is so fatiguing as the eternal hanging on of an uncompleted task.', author: 'William James'},
	{sentence: 'Don&#39t let yesterday use up too much of today.', author:'Will Rogers'},
	{sentence:'Don&#39t let the noise of others&#39 opinions drown out your own inner voice. Have the courage to follow your own heart and intuition.', author:'Steve Jobs'},
	{sentence:'If it ain&#39t fun, don&#39t do it.', author:'Jack Canfield'},
	{sentence: 'We tend to judge others by their behavior, and ourselves by our intentions.', author: 'Unknown'}
	];

function displayQuote() {
	const element = (
	<div className="quoteDiv">
  		<p className="quoteSentence">{quotesList[0].sentence}</p>
  		<p className="quoteAuthor">{quotesList[0].author}</p>
  	</div>
  		);

  		ReactDOM.render(
  		element,
  		document.getElementById('root')
  	);	
}

setInterval(displayQuote, 86400000);

export default Quotes;
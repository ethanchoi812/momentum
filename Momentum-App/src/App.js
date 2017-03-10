import React, { Component } from 'react';
import './App.css';
import ClockContainer from './components/clock/ClockContainer';
import GreetingContainer from './components/greeting/GreetingContainer';
import Settings from './components/Settings/settings.js';
import WeatherContainer from './components/weather/WeatherContainer';
import Todo from './components/todo/todo.js';
import Quotes from './components/quotes/quotes.js';


class App extends Component {
  
  /*
  componentWillMount(){
    var num = 1;
    document.querySelector('screen').classList.add(`bgi${num}`);
  }
  */
  
  render() {
    return (
      <div className="screen">
        <ClockContainer />
        <WeatherContainer />
        <Todo />
        <GreetingContainer />
        <Settings />
        <Quotes />
      </div>
    );
  }
}

export default App;

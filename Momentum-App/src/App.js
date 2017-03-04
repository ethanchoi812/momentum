import React, { Component } from 'react';
import './App.css';
import Clock from './components/clock.js';
import Greetings from './components/greetings.js';
import Settings from './components/settings.js';
import WeatherContainer from './components/weather/WeatherContainer';
import Todo from './components/todo/todo.js';


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
        <Clock />
        <WeatherContainer />
        <Greetings />
        <Todo />
        <Settings />
      </div>
    );
  }
}

export default App;

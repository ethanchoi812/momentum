import React, { Component } from 'react';
import './App.css';
import Clock from './components/clock.js'
import Greetings from './components/greetings.js'
import Settings from './components/settings.js'
import Weather from './components/weather.js'
import Todo from './components/todo.js'


class App extends Component {
  render() {
    return (
      <div>
        <Clock />
        <Weather />
        <Greetings />
        <Todo />
        <Settings />
      </div>
    );
  }
}

export default App;

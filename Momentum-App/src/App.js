import React, { Component } from 'react';
import './App.css';
import ClockContainer from './components/clock/ClockContainer';
import GreetingContainer from './components/greeting/GreetingContainer';
import Settings from './components/Settings/settings.js';
import WeatherContainer from './components/weather/WeatherContainer';
import Todo from './components/todo/todo.js';
import Quotes from './components/quotes/quotes.js';


class App extends Component {
constructor(){
  super();
  this.state = {
    renderClock: true,
    renderWeather: true,
    renderTodo: true,
    renderGreeting: true,
    renderQuote: true
  }
}
  componentWillMount = () => {
    const component = this;
    window.chrome.storage.sync.get(["clock", "weather", "todo", "greeting", "quote"], function(data){
      console.log(data);
      component.setState({
        renderClock: data.clock === undefined ? true : data.clock,
        renderWeather: data.weather === undefined ? true : data.weather,
        renderTodo: data.todo=== undefined ? true : data.todo,
        renderGreeting: data.greeting === undefined ? true : data.greeting,
        renderQuote: data.quote === undefined ? true : data.quote
      })
    })
  }

  weatherSwitcher = () => {
    window.chrome.storage.sync.set({"weather": !this.state.renderWeather})
    this.setState({
      renderWeather: !this.state.renderWeather
    });
  }

  clockSwitcher = () => {
    window.chrome.storage.sync.set({"clock": !this.state.renderClock})
    this.setState({
      renderClock: !this.state.renderClock
    })
  }

  todoSwitcher = () => {
    window.chrome.storage.sync.set({"todo": !this.state.renderTodo})
    this.setState({
      renderTodo: !this.state.renderTodo
    })
  }

  greetingSwitcher = () => {
    console.log(this);
    window.chrome.storage.sync.set({"greeting": !this.state.renderGreeting})
    this.setState({
      renderGreeting: !this.state.renderGreeting
    })
  }

  quoteSwitcher = () => {
    window.chrome.storage.sync.set({"quote": !this.state.renderQuote})
    this.setState({
      renderQuote: !this.state.renderQuote
    })
  }


  render() {
    return (
      <div className="screen">
        {this.state.renderClock ? <ClockContainer /> : null}
        {this.state.renderWeather ? <WeatherContainer /> : <WeatherContainer hide={true} />}
        {this.state.renderTodo ? <Todo /> : null}
        {this.state.renderGreeting ? <GreetingContainer /> : null}
        <Settings weatherSwitcher={this.weatherSwitcher}
                  clockSwitcher={this.clockSwitcher}
                  todoSwitcher={this.todoSwitcher}
                  greetingSwitcher={this.greetingSwitcher}
                  quoteSwitcher={this.quoteSwitcher} />
        {this.state.renderQuote ? <Quotes /> : null}
      </div>
    );
  }
}

export default App;

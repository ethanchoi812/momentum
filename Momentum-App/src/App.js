import React, { Component } from 'react';
import './styles/css/App.css';
import ClockContainer from './components/clock/ClockContainer';
import GreetingContainer from './components/greeting/GreetingContainer';
import Settings from './components/Settings/settings.js';
import WeatherContainer from './components/weather/WeatherContainer';
import Todo from './components/todo/todo.js';
import QuotesContainer from './components/quotes/QuotesContainer.js';


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
    window.chrome.storage.sync.get(["clockON", "weatherON", "todoON", "greetingON", "quoteON"], function(data){
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
    window.chrome.storage.sync.set({"weatherON": !this.state.renderWeather})
    this.setState({
      renderWeather: !this.state.renderWeather
    });
  }

  clockSwitcher = () => {
    window.chrome.storage.sync.set({"clockON": !this.state.renderClock})
    this.setState({
      renderClock: !this.state.renderClock
    })
  }

  todoSwitcher = () => {
    window.chrome.storage.sync.set({"todoON": !this.state.renderTodo})
    this.setState({
      renderTodo: !this.state.renderTodo
    })
  }

  greetingSwitcher = () => {
    window.chrome.storage.sync.set({"greetingON": !this.state.renderGreeting})
    this.setState({
      renderGreeting: !this.state.renderGreeting
    })
  }

  quoteSwitcher = () => {
    window.chrome.storage.sync.set({"quoteON": !this.state.renderQuote})
    this.setState({
      renderQuote: !this.state.renderQuote
    })
  }


  render() {
    return (
      <div className="screen">
        <div className="top-right">
          {this.state.renderWeather ? <WeatherContainer /> : <WeatherContainer hide={true} />}
        </div>
        <div className="center">
          {this.state.renderClock ? <ClockContainer /> : null}
          {this.state.renderGreeting ? <GreetingContainer /> : null}
        </div>
         <div className="bottom">
          {this.state.renderQuote ? <QuotesContainer /> : null}
        </div>
        <div className="bottom-right">
          {this.state.renderTodo ? <Todo /> : null}
        </div>
        <div className="bottom-left">
          <Settings weatherSwitcher={this.weatherSwitcher}
                    clockSwitcher={this.clockSwitcher}
                    todoSwitcher={this.todoSwitcher}
                    greetingSwitcher={this.greetingSwitcher}
                    quoteSwitcher={this.quoteSwitcher} />
        </div>
      </div>
    );
  }
}

export default App;

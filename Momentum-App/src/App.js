import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
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
    renderClock: false,
    renderWeather: false,
    renderTodo: false,
    renderGreeting: false,
    renderQuote: false,
    backgroundURL: ""
  }
}

componentWillMount = () => {
    const component = this;
    window.chrome.storage.sync.get(["clockON", "weatherON", "todoON", "greetingON", "quoteON"], function(data){
      component.setState({
        renderClock: data.clockON === undefined ? true : data.clockON,
        renderWeather: data.weatherON === undefined ? true : data.weatherON,
        renderTodo: data.todoON === undefined ? true : data.todoON,
        renderGreeting: data.greetingON === undefined ? true : data.greetingON,
        renderQuote: data.quoteON === undefined ? true : data.quoteON
      })
    })
    this.setBackground();
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

  openSettings() {
    console.log("You just clicked shit!")
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.classList.toggle("show");
  }

  setBackground = () => {
    const width = window.innerWidth,
          height = window.innerHeight,
          time = parseInt(new Date().toLocaleTimeString(undefined, {hour12: false}), 10),
          //Check the time and insert the id of day picture collection or night picture collection into url
          collection = (time > 18 || time < 5) ? 647731 : 647662, 
          url = `https://source.unsplash.com/collection/${collection}/${width}x${height}/daily`;
    this.setState({backgroundURL: url})
    
  }

  render() {
    const style = {
      backgroundImage: `url(${this.state.backgroundURL})`
    }
    return (
      <div>
          <div className="screen" style={style}></div>
            <div className="widgets">
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
                            quoteSwitcher={this.quoteSwitcher}
                            weatherON={this.state.renderWeather}
                            clockON={this.state.renderClock}
                            quoteON={this.state.renderQuote}
                            todoON={this.state.renderTodo}
                            greetingON={this.state.renderGreeting}
                            opener={this.openSettings} />
              </div>
            </div>
          </div>
    );
  }
}

export default App;

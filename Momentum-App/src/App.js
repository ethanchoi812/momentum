import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import './styles/css/App.css';
import ClockContainer from './components/clock/ClockContainer';
import GreetingContainer from './components/greeting/GreetingContainer';
import Settings from './components/Settings/settings.js';
import WeatherContainer from './components/weather/WeatherContainer';
import Todo from './components/todo/todo.js';
import QuotesContainer from './components/quotes/QuotesContainer.js';
import TodaysFocus from './components/todays-focus/todays-focus.js';
import dayImages from './components/imageLoader/dayImages.js';
import nightImages from './components/imageLoader/nightImages.js'

class App extends Component {
constructor(){
  super();
  this.state = {
    renderClock: false,
    renderWeather: false,
    renderTodo: false,
    renderGreeting: false,
    renderQuote: false,
    renderFocus: false,
    settingsAreMinimized: true,
    savedTimestamp: undefined,
    currentDayImage: undefined,
    currentNightImage: undefined,
    dayBgImages: dayImages,
    nightBgImages: nightImages
  }
}

componentWillMount = () => {
    const component = this;
    window.chrome.storage.sync.get(["clockON", "weatherON", "todoON", "greetingON", "quoteON", "focusON", "savedTimestamp", "currentDayImage", "currentNightImage"], function(data){
      component.setState({
        renderClock: data.clockON === undefined ? true : data.clockON,
        renderWeather: data.weatherON === undefined ? true : data.weatherON,
        renderTodo: data.todoON === undefined ? true : data.todoON,
        renderGreeting: data.greetingON === undefined ? true : data.greetingON,
        renderQuote: data.quoteON === undefined ? true : data.quoteON,
        renderFocus: data.focusON === undefined ? true : data.focusON,
        savedTimestamp: data.savedTimestamp === undefined 
                                                ? undefined 
                                                : data.savedTimestamp,
        currentDayImage: data.currentDayImage === undefined
                                                ? undefined
                                                : data.currentDayImage,
        currentNightImage: data.currentNightImage === undefined
                                                      ? undefined
                                                      : data.currentNightImage
      })
      component.setBackground();
      console.log(component.state);
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

  focusSwitcher = () => {
   window.chrome.storage.sync.set({"focusON": !this.state.renderFocus})
    this.setState({
      renderFocus: !this.state.renderFocus
    })
  }

  setBackground = () => {

          const currentTimestamp = new Date().getTime();
          const random = () => Math.floor(Math.random()*10)

          const updateImage = () => {
            console.log("updating images...");
            this.setState({
              savedTimestamp: currentTimestamp,
              currentDayImage: this.state.dayBgImages[random()],
              currentNightImage: this.state.nightBgImages[random()]
            });
            window.chrome.storage.sync.set({
              "savedTimestamp": currentTimestamp,
              "currentDayImage": this.state.currentDayImage,
              "currentNightImage": this.state.currentNightImage
            });
          }

          //Update bg image if it was a day(+-) since the last update
          if(currentTimestamp - this.state.savedTimestamp > 80000000
            || !this.state.savedTimestamp){
            updateImage();
          }
          

              
  }

  openSettings = () => {
    this.setState({settingsAreMinimized: !this.state.settingsAreMinimized})
  }
  highlightSettings = () => {
    const settingsPanel = document.querySelector('.settingsPanel');
    if (this.state.settingsAreMinimized) {
      settingsPanel.classList.add('highlighted');
    }
  }

  removeSettingsHighlight = () => {
    const settingsPanel = document.querySelector('.settingsPanel');
    if (this.state.settingsAreMinimized) {
      settingsPanel.classList.remove('highlighted');
    }
  }

  render() {
    const time = parseInt(new Date().toLocaleTimeString(undefined,            {hour12: false}), 10);
    const style = {
      backgroundImage: time > 19 || time < 5
                       ? `url(${this.state.currentNightImage})`
                       : `url(${this.state.currentDayImage})`
    }
    return (
      <div>
          <div className="screen" style={style}></div>
            <div className="widgets">
              {
                this.state.renderFocus ?
                  <TodaysFocus toggleOff={this.focusSwitcher} /> :
                  null
              }
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
                </div>
                {this.state.renderTodo ? <Todo /> : null}
                <div className="bottom-left" 
                     onMouseEnter={this.highlightSettings}
                     onMouseLeave={this.removeSettingsHighlight} >
                  <Settings weatherSwitcher={this.weatherSwitcher}
                            clockSwitcher={this.clockSwitcher}
                            todoSwitcher={this.todoSwitcher}
                            greetingSwitcher={this.greetingSwitcher}
                            quoteSwitcher={this.quoteSwitcher}
                            focusSwitcher={this.focusSwitcher}
                            weatherON={this.state.renderWeather}
                            clockON={this.state.renderClock}
                            quoteON={this.state.renderQuote}
                            todoON={this.state.renderTodo}
                            greetingON={this.state.renderGreeting}
                            focusON={this.state.renderFocus}
                            opener={this.openSettings}
                            minimized={this.state.settingsAreMinimized} />
                            
              </div>
            </div>
          </div>
    );
  }
}

export default App;

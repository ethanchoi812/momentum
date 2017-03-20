import React, { Component } from 'react';
import { PropTypes } from 'react';
//import './settings.css';
import User from './user';
import Switch from './switch';     




const componentName = props => {
  return (
    <div className="settingsBox">
      <div className="iconBox" onClick={props.opener}>
        <img src="https://cdn3.iconfinder.com/data/icons/fez/512/FEZ-04-512.png" alt="settings icon" className="settingsIcon" />
      </div>
        <div className="settingsPanel" id="settingsPanel">
            <h1 className="panelTitle">Settings</h1>
            <Switch item={'Weather'} switcher={props.weatherSwitcher} />
            <Switch item={"Clock"} switcher={props.clockSwitcher} />
            <Switch item={"Greeting"} switcher={props.greetingSwitcher} />
            <Switch item={"Todo"} switcher={props.todoSwitcher} />
            <Switch item={"Quote"} switcher={props.quoteSwitcher} />
        </div>
    </div>
    );
  }


componentName.propTypes = {
  weatherON: React.PropTypes.bool,
  clockON: React.PropTypes.bool,
  todoON: React.PropTypes.bool,
  greetingON: React.PropTypes.bool,
  quoteON: React.PropTypes.bool,
  weatherSwitcher: React.PropTypes.func,
  clockSwitcher: React.PropTypes.func,
  todoSwitcher: React.PropTypes.func,
  greetingSwitcher: React.PropTypes.func,
  quoteSwitcher: React.PropTypes.func,
  opener: React.PropTypes.func
};

export default componentName;
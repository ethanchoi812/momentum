import React, { PropTypes } from 'react';
//import './settings.css';
import Switch from './switch';     




const Settings = props => {
  return (
        <div className="settingsPanel settingsHidden" id="settingsPanel">
            <h1 className="panelTitle" onClick={props.opener}>Settings</h1>
            <Switch item={'Weather'} switcher={props.weatherSwitcher} isON={props.weatherON} />
            <Switch item={"Clock"} switcher={props.clockSwitcher} isON={props.clockON} />
            <Switch item={"Greeting"} switcher={props.greetingSwitcher} isON={props.greetingON} />
            <Switch item={"Todo"} switcher={props.todoSwitcher} isON={props.todoON} />
            <Switch item={"Quote"} switcher={props.quoteSwitcher} isON={props.quoteON} />
            <Switch item={"Focus"} switcher={props.focusSwitcher} isON={props.focusON} />
        </div>
    );
  }


Settings.propTypes = {
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

export default Settings;

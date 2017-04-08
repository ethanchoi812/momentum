import React, { PropTypes } from 'react';
//import './settings.css';
import Switch from './switch';     




const Settings = props => {
  return (
        <div className={props.minimized
                        ? "settingsPanel settingsHidden"
                        : "settingsPanel"} >

            <div className="settingsControls" 
                onClick={props.minimized
                          ? props.opener
                          : null}>
                <div className="settingsTitle">
                  Settings
                </div>
                <div className="iconBox todo-btn" onClick={props.opener}>
                  <i className={props.minimized
                                ? "fa fa-window-restore"
                                : "fa fa-window-minimize"}></i>
            </div>  
          </div>   
          <div className="settingsItemList">
            <Switch item={'Weather'} switcher={props.weatherSwitcher} 
            isON={props.weatherON} />
            <Switch item={"Clock"} switcher={props.clockSwitcher} 
            isON={props.clockON} />
            <Switch item={"Greeting"} switcher={props.greetingSwitcher} 
            isON={props.greetingON} />
            <Switch item={"Todo"} switcher={props.todoSwitcher} 
            isON={props.todoON} />
            <Switch item={"Quote"} switcher={props.quoteSwitcher} 
            isON={props.quoteON} />
            <Switch item={"Focus"} switcher={props.focusSwitcher} 
            isON={props.focusON} />
          </div>
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

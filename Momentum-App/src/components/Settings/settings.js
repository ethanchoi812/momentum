import React, { Component } from 'react';
import './settings.css';
import User from './user';
import Switch from './switch';



export default class Settings extends Component {
  
  toggleSettings(){
    var settingsClass = document.querySelector(".settings").classList;
    settingsClass.toggle('hideSettings');
  }
  
  render() {
    return (
      <div>
        <div id="settingscog" onClick={this.toggleSettings.bind(this)} >
          <img id="cog" alt="settings" src="http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Settings-icon.png" />
        </div>
        <div className="settings hideSettings">
          <div className="settingGroups">
            <div>General</div>
            <div>ToDo</div>
            <div>Background</div>
            <div>Quotes</div>
          </div>
          <div className="setGeneral">
            <User />
            <div className="onOff">
              <div className="miniTitle"><strong>Widgets</strong></div>
              <div className="underline" />
              <Switch item={'Weather'} />
              <Switch item={"Clock"} />
              <Switch item={"Focus"} />
              <Switch item={"Todo"} />
            </div>
          </div>
          <div className="setTodo">
          </div>
          <div className="setBackground">
          </div>
          <div className="setQuotes">
          </div>
        </div>
      </div>
    );
  }
}

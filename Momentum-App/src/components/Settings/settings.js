import React, { Component } from 'react';
//import './settings.css';
import User from './user';
import Switch from './switch';



export default class Settings extends Component {

  toggleSettings(){
    var settingsClass = document.querySelector(".settings").classList;
    settingsClass.toggle('hideSettings');
  }



  componentDidMount(){
    var settings = JSON.parse(localStorage.getItem('settings')) ||
      {'general': {
        'Weather': true,
        'Clock': true,
        'Greeting': true,
        'Todo': true,
        'Quote': true
        }
      };

    for (var key in settings.general){
        if (!settings.general[key]){
            document.getElementById(key).classList.add('bitOff');
        }
    }

    console.log(localStorage.getItem('settings'));
    console.log(settings)


    document.querySelector('.setGeneral').addEventListener('click', function(e){
      if(~e.target.className.indexOf('toggleBit')){ // if a toggle is clicked
        document.getElementById(e.target.id).classList.toggle('bitOff');
        settings.general[e.target.id] = !settings.general[e.target.id];
        console.log(settings.general[e.target.id]);
        console.log(JSON.stringify(settings));
        localStorage.setItem('settings', JSON.stringify(settings));
      }
    });
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
          <div className="setGeneral shown">
            <User />
            <div className="onOff" onClick={this.toggleField}>
              <div className="miniTitle"><strong>Widgets</strong></div>
              <div className="underline" />
              <Switch item={'Weather'} switcher={this.props.weatherSwitcher} />
              <Switch item={"Clock"} switcher={this.props.clockSwitcher} />
              <Switch item={"Greeting"} switcher={this.props.greetingSwitcher} />
              <Switch item={"Todo"} switcher={this.props.todoSwitcher} />
              <Switch item={"Quote"} switcher={this.props.quoteSwitcher} />
            </div>
          </div>
          <div className="setTodo hidden">
          </div>
          <div className="setBackground hidden">
          </div>
          <div className="setQuotes hidden">
          </div>
        </div>
      </div>
    );
  }
}

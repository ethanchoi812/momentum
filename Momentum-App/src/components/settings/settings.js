import React, { Component } from 'react';
import './settings.css';
import User from './user';
import Switch from './switch'



export default class Settings extends Component {
    render() {
        return (
            <div>
                <div id="settingsCog" onClick={this.toggleSettings()}>
                    <img id="cog" src="http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Settings-icon.png" alt="settings" />
                </div>
                <div className="settings">
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
                    <div className="setTodo"></div>
                    <div className="setBackground"></div>
                    <div className="setQuotes">
                    </div>
                </div>
            </div>
        );
    }
}

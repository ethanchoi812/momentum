import React, { Component } from 'react';
import ClockBar from './ClockBar'

class ClockContainer extends Component {
    constructor(){
        super();
        this.state = {
            currTime24: "",
            currTime12: "",
            hour12: false,
            settingsLoaded: false
        }
    }

    componentDidMount = () => {
        const component = this;
        window.chrome.storage.sync.get("clockHour12", function(data){
            component.setState({
                hour12: data.clockHour12 === undefined ? false : data.clockHour12,   
                settingsLoaded: true
            })
            console.log(component.state);
        })
        this.getTime();
        setInterval(this.getTime, 1000);
    }

    getTime = () => {
        let date = new Date();
        let selectSeconds = /(:\d{2}$|:\d{2}(?=\s))/
        let time12 = date.toLocaleTimeString(undefined, {hour12: true});
        time12 = time12.replace(selectSeconds, "");
        let time24 = date.toLocaleTimeString(undefined, {hour12: false});
        time24 = time24.replace(selectSeconds, "");

        this.setState({
            currTime24: time24,
            currTime12: time12,
        });
    }

    switchTimeFormat = () => {
        window.chrome.storage.sync.set({"clockHour12": !this.state.hour12})
        this.setState({hour12: !this.state.hour12});
    }

    render() {
        return this.state.settingsLoaded 
            ? (<ClockBar time={this.state.hour12 ? this.state.currTime12 : this.state.currTime24} handleClick={this.switchTimeFormat} />)
            : (null)
    }
};

export default ClockContainer;
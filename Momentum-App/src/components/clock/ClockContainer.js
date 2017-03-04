import React, { Component } from 'react';
import ClockBar from './ClockBar'

class ClockContainer extends Component {
    constructor(){
        super();
        this.state = {
            currTime24: "",
            currTime12: "",
            hour12: false
        }
    }

    componentDidMount(){
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
        this.setState({hour12: !this.state.hour12});
    }

    render() {
        return (
            <ClockBar time={this.state.hour12 ? this.state.currTime12 : this.state.currTime24} handleClick={this.switchTimeFormat} />
            );
    }
};

export default ClockContainer;
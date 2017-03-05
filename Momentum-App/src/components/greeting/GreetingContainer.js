import React, { Component } from 'react';
import Greeting from './Greeting'
import AskUserName from './AskUserName'

class Greetingcontainer extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
        }
    }
    render() {
        if(this.state.username){
            return (<Greeting />)
        }else {
            return (<AskUserName />)
        }
    }
}

export default Greetingcontainer;
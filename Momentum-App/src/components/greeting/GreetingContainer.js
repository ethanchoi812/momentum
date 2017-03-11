import React, { Component } from 'react';
import Greeting from './Greeting'
import AskUserName from './AskUserName'

class GreetingContainer extends Component {
    constructor(){
        super();
        this.state = {
            formValue: "",
            username: ""
        }
    }

    handleChange = (event)=>{
        this.setState({formValue: event.target.value})
    }

    handleSubmit = (event)=>{
        this.setState({username: this.state.formValue});
        event.preventDefault();
    }

    render(){
        return this.state.username ? (<Greeting username={this.state.username} />) :
            (<AskUserName formValue={this.state.formValue} onChange={this.handleChange} onSubmit={this.handleSubmit}/>)      
    }
}

export default GreetingContainer;
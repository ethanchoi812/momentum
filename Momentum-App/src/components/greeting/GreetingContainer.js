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

    /*componentWillMount = ()=>{
        const component = this;
        window.chrome.storage.sync.get("username", function(data){
            component.setState({username: data.username});
        });
    }*/
    handleChange = (event)=>{
        this.setState({formValue: event.target.value});
    }

    handleSubmit = (event)=>{
        this.setState({username: this.state.formValue});
        //window.chrome.storage.sync.set({'username': this.state.formValue})
        event.preventDefault();
    }
    resetUsername = ()=>{
        console.log(this.state);
        this.setState({username: "", formValue: ""});
    }

    render(){
        return this.state.username ? (<Greeting username={this.state.username} onDoubleClick={this.resetUsername} />) :
            (<AskUserName formValue={this.state.formValue} onChange={this.handleChange} onSubmit={this.handleSubmit} />)   
    }
}

export default GreetingContainer;
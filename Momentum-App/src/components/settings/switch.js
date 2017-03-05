import React, { Component } from 'react';
import './switch.css';

export default class Switch extends Component {
  /*
  toggleField(){
    var option = this.props.name.toLowerCase();
    
  }
  */
  
  render() {
    return (
      <div className="switch">
        <div>{this.props.item}</div>
        <div className="flickSwitch" />
        <div className="lineUnder" />
      </div>
    );
  }
}

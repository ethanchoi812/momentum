import React, { Component } from 'react';
import './switch.css';

export default class Switch extends Component {
  
  render() {
    return (
      <div className="switch">
        <div>{this.props.item}</div>
        <div className="toggleBody">
          <div className="toggleBit" id={this.props.item} onClick={this.props.switcher} />
        </div>
        <div className="lineUnder" />
      </div>
    );
  }
}
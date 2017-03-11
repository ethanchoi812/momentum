import React, { Component } from 'react';
import './user.css';



export default class User extends Component {
  render() {
    return (
      <div className="user">
        <img className="circle" alt="Profile" src="https://www.gravatar.com/avatar/84640dd7d7414cd66ecc8b9226821aed?s=50&d=mm" />
        <div className="username">Pretend User</div>
      </div>
    );
  }
}

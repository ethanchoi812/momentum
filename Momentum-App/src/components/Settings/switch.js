//import './switch.css';
import React, { PropTypes } from 'react';

const Switch = props => {
  return (
    <div className="settingsItem">
      <div className="itemName">{props.item}</div>
      <div className="switcherContainer">
        <div className={props.isON ? "itemSwitcher switchON" : "itemSwitcher"} onClick={props.switcher}></div>
      </div>
    </div>
  );
};

Switch.propTypes = {
  isON: React.PropTypes.bool,
  item: React.PropTypes.string,
  switcher: React.PropTypes.func
};

export default Switch;
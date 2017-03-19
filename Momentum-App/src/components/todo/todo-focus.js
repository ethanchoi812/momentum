import React from 'react';
import { focusLevels } from './todo-utils';

export default class TodoFocus extends React.Component {
  render() {
    let message;
    switch(this.props.focusLevel) {
      case focusLevels.LOW:
        message = '#3';
        break;

      case focusLevels.MID:
        message = '#2';
        break;

      case focusLevels.HIGH:
        message = '#1';
        break;

      default:
        message = <i className="fa fa-star"></i>;
    }

    return (
      <div className="todo-item-elem todo-item-focus">
        <button onClick={this.props.onUpdateFocus}>
          { message }
        </button>
      </div>
    );
  }
};

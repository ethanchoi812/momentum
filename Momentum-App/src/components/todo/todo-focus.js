import React from 'react';
import { focusLevels } from './todo-utils';

export default class TodoFocus extends React.Component {
  render() {
    let message;
    switch(this.props.focusLevel) {
      case focusLevels.LOW:
        message = (
          <span className="todo-low-focus">
            <i className="fa fa-star"></i>
          </span>
        );
        break;

      case focusLevels.MID:
        message = (
          <span className="todo-mid-focus">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        );
        break;

      case focusLevels.HIGH:
        message = (
          <span className="todo-high-focus">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        );
        break;

      default:
        message = <i className="fa fa-star-o"></i>;
    }

    return (
      <div className="todo-item-elem todo-item-focus">
        <button onClick={this.props.onUpdateFocus}
          title={this.props.focusLevel === focusLevels.NONE ?
            "Add focus" : "Remove focus"}
          className="todo-btn">
          { message }
        </button>
      </div>
    );
  }
};

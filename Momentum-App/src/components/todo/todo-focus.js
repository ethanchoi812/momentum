import React from 'react';
import { focusLevels } from './todo-utils';

export default class TodoFocus extends React.Component {
  render() {
    let message;
    switch(this.props.focusLevel) {
      case focusLevels.LOW:
        message = (
          <span>
            <i className="fa fa-star"></i>
          </span>
        );
        break;

      case focusLevels.MID:
        message = (
          <span>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        );
        break;

      case focusLevels.HIGH:
        message = (
          <span>
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
        <button onClick={this.props.onUpdateFocus}>
          { message }
        </button>
      </div>
    );
  }
};

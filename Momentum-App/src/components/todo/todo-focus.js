import React from 'react';
import { focusLevels } from './todo-utils';

export default class TodoFocus extends React.Component {
  render() {
    let message;
    switch(this.props.focusLevel) {
      case focusLevels.LOW:
        message = 'Focus #3';
        break;

      case focusLevels.MID:
        message = 'Focus #2';
        break;

      case focusLevels.HIGH:
        message = 'Focus #1';
        break;

      default:
        message = 'Set as focus';
    }

    return (
      <div className="todo-item-focus">
        <button onClick={this.props.onUpdateFocus}>
          { message }
        </button>
      </div>
    );
  }
};

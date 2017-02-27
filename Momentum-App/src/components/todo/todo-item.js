import React from 'react';

export default class TodoItem extends React.Component {
  render() {
    return (
      <li>
        <input onChange={this.props.onToggleDone} checked={this.props.done} type="checkbox" />
        {!this.props.isEditing &&
          <span onClick={this.props.onStartEditing}>{this.props.title}</span>}
        {this.props.isEditing &&
          <input value={this.props.title} onChange={this.props.onEdit}
            onBlur={this.props.onFinishEditing} autoFocus={true} />}
        <button onClick={this.props.onSetAsFocus}>Set as focus</button>
        <input type="datetime" />
        <button>Show time remaining</button>
        <button onClick={this.props.onRemove}>Remove</button>
      </li>
    );
  }
};

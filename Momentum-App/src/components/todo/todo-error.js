import React from 'react';

export default class TodoError extends React.Component {
  render() {
    if(!this.props.error) return null;

    return (
      <div className="todo-error">
        <h4 onClick={this.props.dismiss}>{this.props.error}</h4>
      </div>
    );
  }
};

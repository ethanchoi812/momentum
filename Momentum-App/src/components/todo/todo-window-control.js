import React from 'react';

export default class TodoWindowControl extends React.Component {
  render() {
    return (
      <div className="todo-window-control">
        <h3 className="todo-window-title">TODO</h3>
        <button className="todo-btn todo-window-btn"
          onClick={this.props.toggleLarge}>
          {this.props.isLarge && <i className="fa fa-window-restore"></i>}
          {!this.props.isLarge && <i className="fa fa-window-maximize"></i>}
        </button>
      </div>
    );
  }
};

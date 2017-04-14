import React from 'react';

export default class TodoWindowControl extends React.Component {
  render() {
    return (
      <div className="todo-window-control">
        <h3
          className="todo-window-title"
          onClick={() => this.props.isMin && this.props.toggleMin()}
        >TODO</h3>
        <div>
          <button className="todo-btn todo-window-btn"
            title={this.props.isMin ? 'Restore' : 'Minimize'}
            onClick={this.props.toggleMin}>
            {this.props.isMin && <i className="fa fa-window-restore"></i>}
            {!this.props.isMin && <i className="fa fa-window-minimize"></i>}
          </button>
          <button className="todo-btn todo-window-btn"
            title={this.props.isLarge ? 'Restore' : 'Maximize'}
            onClick={this.props.toggleLarge}>
            {this.props.isLarge && <i className="fa fa-window-restore"></i>}
            {!this.props.isLarge && <i className="fa fa-window-maximize"></i>}
          </button>
        </div>
      </div>
    );
  }
};


import React from 'react';
import { filters } from './todo-utils';

export default class TodoFilterControl extends React.Component {
  handleDragOver(evt) {
    evt.preventDefault();
  }

  render() {
    const buttons = Object.getOwnPropertyNames(filters)
      .map((filter) => {
        const dragProps = Object.create(null);
        let icon;

        switch(filter) {
          case 'CURRENT':
            dragProps.onDragOver = this.handleDragOver;
            dragProps.onDrop = (evt) => this.props.doneDrop(false, evt);
            icon = 'pencil';
            break;

          case 'DONE':
            dragProps.onDragOver = this.handleDragOver;
            dragProps.onDrop = (evt) => this.props.doneDrop(true, evt);
            icon = 'check';
            break;

          default:
            icon = 'list-ol';
            break;
        }

        return (
          <button
            key={filter}
            className="todo-filter-button"
            onClick={() => this.props.onChangeFilter(filters[filter])}
            {...dragProps}
          ><i className={"fa fa-2x fa-" + icon}></i></button>
        );
      });

    return (
      <div className="todo-filter-control">
        {buttons}
      </div>
    );
  }
};

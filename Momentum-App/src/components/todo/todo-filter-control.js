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

        switch(filter) {
          case 'CURRENT':
            dragProps.onDragOver = this.handleDragOver;
            dragProps.onDrop = (evt) => this.props.doneDrop(false, evt);
            break;

          case 'DONE':
            dragProps.onDragOver = this.handleDragOver;
            dragProps.onDrop = (evt) => this.props.doneDrop(true, evt);
            break;

          default:
            break;
        }

        return (
          <button
            key={filter}
            className="todo-filter-button"
            onClick={() => this.props.onChangeFilter(filters[filter])}
            {...dragProps}
          >{filter}</button>
        );
      });

    return (
      <div className="todo-filter-control">
        {buttons}
      </div>
    );
  }
};

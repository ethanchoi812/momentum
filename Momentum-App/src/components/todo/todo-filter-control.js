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

        const isActive = filters[filter] === this.props.filter
          ? 'todo-filter-active'
          : 'todo-filter-inactive';

        return (
          <button
            key={filter}
            className={isActive + ' todo-btn todo-filter-button'}
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

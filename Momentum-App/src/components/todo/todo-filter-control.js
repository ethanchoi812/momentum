import React from 'react';
import { filters } from './todo-utils';

export default class TodoFilterControl extends React.Component {
  render() {
    const buttons = Object.getOwnPropertyNames(filters)
      .map((filter) => (
        <button key={filter} className="todo-filter-button"
          onClick={() => this.props.onChangeFilter(filters[filter])}
        >{filter}</button>
      ));

    return (
      <div className="todo-filter-control">
        {buttons}
      </div>
    );
  }
};

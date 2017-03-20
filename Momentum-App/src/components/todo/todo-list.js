import React from 'react';
import TodoItem from './todo-item';
import { filters } from './todo-utils';

export default class TodoList extends React.Component {
  render() {
    const items = this.props.items
      .map((item, idx) => {
        const isDisplayed = this.props.filter === filters.ALL ||
          (this.props.filter === filters.CURRENT && !item.done) ||
          (this.props.filter === filters.DONE && item.done);

        if(!isDisplayed) return null;

        const itemCopy = Object.assign({}, item);

        return (
          <TodoItem
            key={item.createDate}
            idx={idx}
            item={itemCopy}
            modifyItem={(updates) => this.props.modifyItem(idx, updates)}
            saveDragged={(evt) => this.props.saveDragged(idx, evt)}
            moveDragged={(evt) => this.props.moveDragged(idx, evt)}
          />
        );
      });

    const numDisplayedItems = items.filter(item => !!item).length;

    let currentList;
    switch(this.props.filter) {
      case filters.CURRENT:
        currentList = 'current';
        break;

      case filters.DONE:
        currentList = 'done';
        break;

      default:
        currentList = 'todo';
    }

    return (
      <div className="todo-list">
        { numDisplayedItems > 0 && <ul>{items}</ul> }

        { this.props.filter !== filters.DONE &&
          <div className="todo-list-add-area">
            <button onClick={this.props.addNewItem}
              className="todo-add-btn todo-btn">
              <i className="fa fa-5x fa-plus"></i>
            </button>
          </div> }

        { numDisplayedItems === 0 &&
          <h4 className="todo-summary">No {currentList} items</h4> }
        { numDisplayedItems > 0 &&
          <h4 className="todo-summary">Total: {numDisplayedItems} {currentList} item{ numDisplayedItems !== 1 && 's'}</h4> }
      </div>
    );
  }
};

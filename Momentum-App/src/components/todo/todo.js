import React, { Component } from 'react';
import './todo.css';
import TodoItem from './todo-item';
import TodoFilterControl from './todo-filter-control';
import { filters, focusLevels, saveTodo, loadTodo } from './todo-utils';

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      filter: filters.ALL,
      maxDoneItems: 20,
      loading: true,
      error: null
    };

    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    for(const key of keys) {
      if(typeof this[key] === 'function' && key !== 'componentDidMount' &&
        key !== 'componentDidUpdate' &&
        key !== 'constructor' && key !== 'render') {
        this[key] = this[key].bind(this);
      }
    }
  }

  componentDidMount() {
    loadTodo().then((todoList) => {
      this.setState((prevState) => ({
        items: todoList || prevState.items,
        loading: false,
        error: null
      }));

      console.log('loaded!');
      console.table(todoList);
    }, (err) => {
      const errorMessage = (err && err.message) ||
        (err && err.toString()) || 'Unknown Error';

      this.setState({
        loading: false,
        error: `Fail to load todo list: ${errorMessage}`
      });
    });
  }

  removeDoneItems() {
    this.setState((prevState) => {
      const items = prevState.items.slice();
      const max = prevState.maxDoneItems;

      const itemsToBeRemoved = items
        .filter(item => item.done)
        .sort(function(lastItem, nextItem) {
          return lastItem.finishDate < nextItem.finishDate
            ? 1
            : -1;
        })
        .slice(max);

      for(let i = items.length - 1; i >= 0; i--) {
        if(itemsToBeRemoved.includes(items[i])) {
          items.splice(i, 1);
        }
      }

      return { items };
    });
  }

  changeFilter(filterOption) {
    this.setState({
      filter: filterOption
    });
  }

  removeItem(i) {
    this.setState((prevState) => {
      const items = prevState.items.slice();
      items.splice(i, 1);

      return { items };
    });
  }

  updateFocus(i) {
    this.setState((prevState) => {
      const items = prevState.items.slice();

      if(items[i].focusLevel === focusLevels.NONE && !items[i].done) {
        items.forEach(function(item) {
          item.focusLevel = focusLevels.bubbleDown(item.focusLevel);
        });
        items[i].focusLevel = focusLevels.HIGH;
      } else {
        items.forEach(function(item) {
          item.focusLevel = focusLevels.bubbleUp(
            item.focusLevel, items[i].focusLevel);
        });
        items[i].focusLevel = focusLevels.NONE;
      }

      return { items };
    });
  }

  addNewItem() {
    const newItem = {
      title: '',
      focusLevel: 0,
      done: false,
      isCountingDown: false,

      createDate: Date.now(),
      dueDate: Date.now() + 24 * 60 * 60 * 1000,
      finishDate: null,
    };

    this.setState((prevState) => ({
      items: prevState.items.concat([newItem])
    }));
  }

  modifyItem(idx, updates) {
    if(updates.hasOwnProperty('remove')) {
      if(this.state.items[idx].focusLevel !== focusLevels.NONE) {
        this.updateFocus(idx);
      }
      this.removeItem(idx);
      return;
    }

    if(updates.hasOwnProperty('focus')) {
      this.updateFocus(idx);
      return;
    }

    if(updates.done === true &&
      this.state.items[idx].focusLevel !== focusLevels.NONE) {

      this.updateFocus(idx);
    }

    this.setState((prevState) => {
      const items = prevState.items.slice();
      Object.assign(items[idx], updates);

      return { items };
    });

    if(updates.hasOwnProperty('done')) {
      this.removeDoneItems();
    }
  }

  saveDragged(idx, evt) {
    this.dragging = idx;
  }

  moveDragged(newIdx, evt) {
    evt.preventDefault();

    this.setState((prevState) => {
      const items = prevState.items.slice();
      const draggedItem = items[this.dragging];

      items.splice(this.dragging, 1);
      items.splice(newIdx, 0, draggedItem);

      this.dragging = newIdx;

      return { items };
    });
  }

  doneDrop(done, evt) {
    evt.preventDefault();

    // no-op if dragging todo item to the original tab
    if(this.state.items[this.dragging].done && done) return;
    if(!this.state.items[this.dragging].done && !done) return;

    this.modifyItem(this.dragging, {
      done: done,
      finishDate: (done ? Date.now() : null),
      isCountingDown: false
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.items === this.state.items) return;

    saveTodo(this.state.items).then(() => {
      this.setState({
        error: null
      });

      console.log('saved!');
    }, (err) => {
      const errorMessage = (err && err.message) ||
        (err && err.toString()) || 'Unknown Error';

      this.setState({
        error: `Fail to store todo-list: ${errorMessage}`
      });
    });
  }

  render() {
    
    const items = this.state.items
      .map((item, idx) => {
        const isDisplayed = this.state.filter === filters.ALL ||
          (this.state.filter === filters.CURRENT && !item.done) ||
          (this.state.filter === filters.DONE && item.done);

        if(!isDisplayed) return null;

        const itemCopy = Object.assign({}, item);

        return (
          <TodoItem
            key={item.createDate}
            item={itemCopy}
            modifyItem={(updates) => this.modifyItem(idx, updates)}
            saveDragged={(evt) => this.saveDragged(idx, evt)}
            moveDragged={(evt) => this.moveDragged(idx, evt)}
          />
        );
      });

    const numDisplayedItems = items.filter(item => !!item).length;

    let currentList;
    switch(this.state.filter) {
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
      <div className="todo">
        <h3>TODO LIST</h3>

        <TodoFilterControl
          onChangeFilter={this.changeFilter}
          doneDrop={this.doneDrop} />

        { this.state.loading && <h4>Loading...</h4> }

        { !this.state.loading && <div>
          { numDisplayedItems > 0 && <ul>{items}</ul> }
          { numDisplayedItems === 0 && <h4>No {currentList} items</h4> }

          { this.state.filter !== filters.DONE &&
            <button onClick={this.addNewItem}>Add a new item</button> }

          { numDisplayedItems > 0 &&
            <h4>Total: {numDisplayedItems} {currentList} item{
            numDisplayedItems !== 1 && 's'}</h4> }
        </div> }

        { this.state.error && <h4>{this.state.error}</h4> }
      </div>
    );
  }
}

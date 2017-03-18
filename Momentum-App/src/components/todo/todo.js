import React, { Component } from 'react';
//import './todo.css';
import TodoList from './todo-list';
import TodoFilterControl from './todo-filter-control';
import TodoLoader from './todo-loader';
import TodoError from './todo-error';
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
      isEditing: true,

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
    if(this.dragging === newIdx) return;

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

    const isEditing = this.state.items
      .map(item => item.isEditing)
      .includes(true);

    if(isEditing) return;

    saveTodo(this.state.items).then(() => {
      this.setState({
        error: null
      });
    }, (err) => {
      const errorMessage = (err && err.message) ||
        (err && err.toString()) || 'Unknown Error';

      this.setState({
        error: `Fail to store todo-list: ${errorMessage}`
      });
    });
  }

  dismissError() {
    this.setState({
      error: null
    });
  }

  render() {
    if(this.state.loading) return <TodoLoader />;

    return (
      <div className="todo">
        <h3>TODO LIST</h3>

        <TodoFilterControl
          onChangeFilter={this.changeFilter}
          doneDrop={this.doneDrop} />

        <TodoList
          items={this.state.items.slice()}
          filter={this.state.filter}
          addNewItem={this.addNewItem}
          modifyItem={this.modifyItem}
          saveDragged={this.saveDragged}
          moveDragged={this.moveDragged} />

        <TodoError error={this.state.error} dismiss={this.dismissError} />
      </div>
    );
  }
}

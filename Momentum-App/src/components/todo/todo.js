import React, { Component } from 'react';
import './todo.css';
import TodoItem from './todo-item';

const filters = {
  ALL: 'all',
  CURRENT: 'current',
  DONE: 'done'
};

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      filter: filters.ALL
    };

    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    for(const key of keys) {
      if(typeof this[key] === 'function' &&
        key !== 'constructor' && key !== 'render') {
        this[key] = this[key].bind(this);
      }
    }
  }

  changeFilter(filterOption) {
    this.setState({
      filter: filterOption
    });
  }

  toggleDone(i) {
    this.setState((prevState) => {
      const items = prevState.items.slice();
      items[i].done = !items[i].done;

      return { items };
    });
  }

  removeItem(i) {
    this.setState((prevState) => {
      const items = prevState.items.slice();
      items.splice(i, 1);

      return { items };
    });
  }

  setAsFocus(i) {
    console.log(`Setting the ${i}-th item as focus`);
  }

  addNewItem() {
    const newItem = {
      title: '',
      focusLevel: 0,
      done: false,
      isCountingDown: false,
      isEditing: true,

      createDate: Date.now(),
      dueDate: null,
      finishDate: null,
    };

    this.setState((prevState) => ({
      items: prevState.items.concat([newItem])
    }));
  }

  startEditing(i) {
    this.setState((prevState) => {
      const items = prevState.items.slice();
      items[i].isEditing = true;

      return { items };
    });
  }

  edit(i, title) {
    this.setState((prevState) => {
      const items = prevState.items.slice();
      items[i].title = title;

      return { items };
    });
  }

  finishEditing(i) {
    this.setState((prevState) => {
      const items = prevState.items.slice();
      items[i].isEditing = false;
      if(!items[i].title) {
        items.splice(i, 1);
      }

      return { items };
    });
  }

      

  render() {
    const items = this.state.items
      .map((item, idx) => {
        const isDisplayed = this.state.filter === filters.ALL ||
          (this.state.filter === filters.CURRENT && !item.done) ||
          (this.state.filter === filters.DONE && item.done);

        if(!isDisplayed) return null;

        return (
          <TodoItem
            key={item.createDate}
            title={item.title}
            done={item.done}
            isEditing={item.isEditing}
            onStartEditing={() => this.startEditing(idx)}
            onEdit={(evt) => this.edit(idx, evt.target.value)}
            onFinishEditing={() => this.finishEditing(idx)}
            onSetAsFocus={() => this.setAsFocus(idx)}
            onRemove={() => this.removeItem(idx)}
            onToggleDone={() => this.toggleDone(idx)}
          />
        );
      })

    return (
      <div className="todo">
        TODO LIST
        <button onClick={() => this.changeFilter(filters.ALL)}>All</button>
        <button onClick={() => this.changeFilter(filters.CURRENT)}>Current</button>
        <button onClick={() => this.changeFilter(filters.DONE)}>Done</button>
        <ul>{items}</ul>
        <button onClick={this.addNewItem}>Add a new item</button>
      </div>
    );
  }
}

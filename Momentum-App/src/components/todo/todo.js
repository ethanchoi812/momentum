import React, { Component } from 'react';
import './todo.css';
import TodoItem from './todo-item';

const filters = {
  ALL: 'all',
  CURRENT: 'current',
  DONE: 'done'
};

const focusLevels = {
  NONE: 0,
  LOW: 1,
  MID: 2,
  HIGH: 3,

  bubbleDown(level) {
    return level === 0
      ? level
      : (level + 4 - 1) % 4;
  },

  bubbleUp(level, until) {
    return (level === 0 || level >= until)
      ? level
      : (level + 1) % 4;
  }
};

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      filter: filters.ALL,
      maxDoneItems: 20
    };

    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    for(const key of keys) {
      if(typeof this[key] === 'function' &&
        key !== 'constructor' && key !== 'render') {
        this[key] = this[key].bind(this);
      }
    }
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

  toggleDone(i) {
    if(!this.state.items[i].done &&
        this.state.items[i].focusLevel !== focusLevels.NONE) {
      this.updateFocus(i);
    }

    this.setState((prevState) => {
      const items = prevState.items.slice();
      items[i].done = !items[i].done;
      items[i].finishDate = items[i].done
        ? Date.now()
        : null;

      return { items };
    });

    this.removeDoneItems();
  }

  removeItem(i) {
    if(this.state.items[i].focusLevel !== focusLevels.NONE) {
      this.updateFocus(i);
    }

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

  startEditing(i) {
    if(this.state.items[i].done) return;

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
    if(this.state.items[i].title) {
      this.setState((prevState) => {
        const items = prevState.items.slice();
        items[i].isEditing = false;

        return { items };
      });
    } else {
      this.removeItem(i);
    }
  }

  changeDate(i, dateString) {
    const matches = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);

    this.setState((prevState) => {
      const items = prevState.items.slice();
      const dueDate = new Date(items[i].dueDate);

      if(matches) {
        dueDate.setYear(matches[1]);
        dueDate.setMonth(matches[2] - 1);
        dueDate.setDate(matches[3]);
      } else {
        dueDate.setYear(new Date().getFullYear());
        dueDate.setMonth(new Date().getMonth());
        dueDate.setDate(new Date().getDate());
      }

      items[i].dueDate = dueDate.getTime();

      return { items };
    });
  }

  changeTime(i, timeString) {
    const matches = timeString.match(/(\d{2}):(\d{2})/);

    this.setState((prevState) => {
      const items = prevState.items.slice();
      const dueDate = new Date(items[i].dueDate);

      if(matches) {
        dueDate.setHours(matches[1]);
        dueDate.setMinutes(matches[2]);
      } else {
        dueDate.setHours(new Date().getHours());
        dueDate.setMinutes(new Date().getMinutes());
      }

      items[i].dueDate = dueDate.getTime();

      return { items };
    });

  }

      
  startCountdown(i) {
    if(this.state.items[i].done) return;

    this.setState((prevState) => {
      const items = prevState.items.slice();
      items[i].isCountingDown = true;

      return { items };
    });
  }

  stopCountdown(i) {
    this.setState((prevState) => {
      const items = prevState.items.slice();
      items[i].isCountingDown = false;

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
            focusLevel={item.focusLevel}
            finishDate={item.finishDate}
            dueDate={item.dueDate}
            isCountingDown={item.isCountingDown}

            onStartCountdown={() => this.startCountdown(idx)}
            onStopCountdown={() => this.stopCountdown(idx)}
            onStartEditing={() => this.startEditing(idx)}
            onEdit={(title) => this.edit(idx, title)}
            onFinishEditing={() => this.finishEditing(idx)}
            onUpdateFocus={() => this.updateFocus(idx)}
            onRemove={() => this.removeItem(idx)}
            onToggleDone={() => this.toggleDone(idx)}
            onChangeDate={(dateString) => this.changeDate(idx, dateString)}
            onChangeTime={(timeString) => this.changeTime(idx, timeString)}
          />
        );
      });

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

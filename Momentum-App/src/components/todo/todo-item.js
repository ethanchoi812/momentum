import React from 'react';
import TodoCountdown from './todo-countdown';
import { formatDateString, formatTimeString } from './todo-utils';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: !this.props.item.title
    };

    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    for(const key of keys) {
      if(typeof this[key] === 'function' && key.match(/^handle/i)) {
        this[key] = this[key].bind(this);
      }
    }
  }

  handleStartCountdown() {
    if(this.props.item.done) return;

    this.props.modifyItem({
      isCountingDown: true
    });
  }

  handleStopCountdown() {
    this.props.modifyItem({
      isCountingDown: false
    });
  }

  handleChangeDate(evt) {
    const matches = evt.target.value.match(/(\d{1,4})-(\d{1,2})-(\d{1,2})/);
    const dueDate = new Date(this.props.item.dueDate);

    if(matches) {
      dueDate.setFullYear(matches[1]);
      dueDate.setMonth(matches[2] - 1);
      dueDate.setDate(matches[3]);
    } else {
      dueDate.setFullYear(new Date().getFullYear());
      dueDate.setMonth(new Date().getMonth());
      dueDate.setDate(new Date().getDate());
    }

    this.props.modifyItem({
      dueDate: dueDate.getTime()
    });
  }

  handleChangeTime(evt) {
    const matches = evt.target.value.match(/(\d{1,2}):(\d{1,2})/);
    const dueDate = new Date(this.props.item.dueDate);

    if(matches) {
      dueDate.setHours(matches[1]);
      dueDate.setMinutes(matches[2]);
    } else {
      dueDate.setHours(new Date().getHours());
      dueDate.setMinutes(new Date().getMinutes());
    }

    this.props.modifyItem({
      dueDate: dueDate.getTime()
    });
  }

  handleChangeTitle(evt) {
    const title = evt.target.value;

    this.props.modifyItem({
      title: title
    });
  }

  handleToggleEdit(evt) {
    if(evt.type === 'keypress' && evt.key !== 'Enter') return;

    if(this.props.item.done) return;

    if(this.state.isEditing && !this.props.item.title) {
      this.props.modifyItem({
        remove: true
      });

      return;
    }

    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }));
  }

  handleRemove() {
    this.props.modifyItem({
      remove: true
    });
  }

  handleToggleDone(evt) {
    const done = evt.target.checked;
    this.props.modifyItem({
      done: done,
      finishDate: (done ? Date.now() : null),
      isCountingDown: false
    });
  }

  handleUpdateFocus() {
    this.props.modifyItem({
      focus: true
    });
  }

  handleDrop(evt) {
    evt.preventDefault();
    console.log('drop', evt.dataTransfer.getData('text'));
    evt.dataTransfer.clearData();
  }

  render() {
    const {
      done,
      title,
      focusLevel,
      isCountingDown,
      dueDate
    } = this.props.item;

    const dueDateObj = new Date(dueDate);
    const year = dueDateObj.getFullYear();
    const month = dueDateObj.getMonth() + 1;
    const date = dueDateObj.getDate();
    const hour = dueDateObj.getHours();
    const minute = dueDateObj.getMinutes();

    const dateString = formatDateString(year, month, date);
    const timeString = formatTimeString(hour, minute);

    const isEditing = this.state.isEditing;

    return (
      <li draggable={true}
          onDragStart={this.props.saveDragged}
          onDragOver={this.props.moveDragged}
          onDrop={this.handleDrop}>
        <input onChange={this.handleToggleDone} checked={done} type="checkbox" />

        {!isEditing && <span onClick={this.handleToggleEdit}>{title}</span>}
        {isEditing && <input value={title} onChange={this.handleChangeTitle}
            onBlur={this.handleToggleEdit}
            onKeyPress={this.handleToggleEdit}
            autoFocus={true} />}
        <button onClick={this.handleUpdateFocus}>
          { focusLevel === 0 && 'Set as focus' }
          { focusLevel === 1 && 'Lowest focus level' }
          { focusLevel === 2 && 'Mid focus level' }
          { focusLevel === 3 && 'Highest focus level' }
        </button>
        { isCountingDown && <input type="date" value={dateString} onChange={this.handleChangeDate}/> }
        { isCountingDown && <input type="time" value={timeString} onChange={this.handleChangeTime}/> }

        { !isCountingDown && <button onClick={this.handleStartCountdown}>Start Countdown</button> }
        { isCountingDown && <TodoCountdown endTime={dueDate}/> }
        { isCountingDown && <button onClick={this.handleStopCountdown}>Stop Countdown</button> }
        <button onClick={this.handleRemove}>Remove</button>
      </li>
    );
  }
};

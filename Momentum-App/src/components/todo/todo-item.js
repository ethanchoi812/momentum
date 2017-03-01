import React from 'react';
import TodoCountdown from './todo-countdown';
import TodoFocus from './todo-focus';
import TodoItemTitle from './todo-item-title';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

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

    if(this.props.item.isEditing && !this.props.item.title) {
      this.props.modifyItem({
        remove: true
      });

      return;
    }

    this.props.modifyItem({
      isEditing: !this.props.item.isEditing
    });
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

    const isEditing = this.props.item.isEditing;

    return (
      <li className="todo-item"
          draggable={true}
          onDragStart={this.props.saveDragged}
          onDragOver={this.props.moveDragged}
          onDrop={this.handleDrop}>

        <input
          onChange={this.handleToggleDone}
          checked={done}
          type="checkbox" />

        <TodoItemTitle
          title={title}
          isEditing={isEditing}
          onChangeTitle={this.handleChangeTitle}
          onToggleEdit={this.handleToggleEdit} />

        <TodoFocus
          focusLevel={focusLevel}
          onUpdateFocus={this.handleUpdateFocus} />

        <TodoCountdown
          onChangeDate={this.handleChangeDate}
          onChangeTime={this.handleChangeTime}
          onStartCountdown={this.handleStartCountdown}
          onStopCountdown={this.handleStopCountdown}
          isCountingDown={isCountingDown}
          dueDate={dueDate} />

        <button onClick={this.handleRemove}>Remove</button>
      </li>
    );
  }
};

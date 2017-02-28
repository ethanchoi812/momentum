import React from 'react';
import TodoCountdown from './todo-countdown';

function pad(num, size, lead = '0') {
  let str = num.toString();

  while(str.length < size) {
    str = lead.toString() + str;
  }

  return str;
}

function formatDateString(year, month, date) {
  return `${pad(year, 4)}-${pad(month, 2)}-${pad(date, 2)}`;
}

function formatTimeString(hour, minute) {
  return `${pad(hour, 2)}:${pad(minute, 2)}`;
}

export default class TodoItem extends React.Component {
  render() {
    const dueDate = new Date(this.props.dueDate);
    const year = dueDate.getFullYear();
    const month = dueDate.getMonth() + 1;
    const date = dueDate.getDate();
    const hour = dueDate.getHours();
    const minute = dueDate.getMinutes();

    const dateString = formatDateString(year, month, date);
    const timeString = formatTimeString(hour, minute);

    const {
      done, isEditing, title, focusLevel, isCountingDown,
        onToggleDone, onStartEditing, onEdit,
        onFinishEditing, onUpdateFocus, onRemove, onChangeDate,
        onChangeTime, onStartCountdown, onStopCountdown
    } = this.props;

    return (
      <li>
        <input onChange={onToggleDone} checked={done} type="checkbox" />
        {!isEditing && <span onClick={onStartEditing}>{title}</span>}
        {isEditing && <input value={title} onChange={(evt) => onEdit(evt.target.value)}
            onBlur={onFinishEditing} autoFocus={true} />}
        <button onClick={onUpdateFocus}>
          { focusLevel === 0 && 'Set as focus' }
          { focusLevel === 1 && 'Lowest focus level' }
          { focusLevel === 2 && 'Mid focus level' }
          { focusLevel === 3 && 'Highest focus level' }
        </button>
        { isCountingDown && <input type="date" value={dateString} onChange={(evt) => onChangeDate(evt.target.value)}/> }
        { isCountingDown && <input type="time" value={timeString} onChange={(evt) => onChangeTime(evt.target.value)}/> }

        { !isCountingDown && <button onClick={onStartCountdown}>Start Countdown</button> }
        { isCountingDown && <TodoCountdown endTime={this.props.dueDate}/> }
        { isCountingDown && <button onClick={onStopCountdown}>Stop Countdown</button> }
        <button onClick={onRemove}>Remove</button>
      </li>
    );
  }
};

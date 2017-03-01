import React from 'react';
import TodoTimer from './todo-timer';
import { formatDateString, formatTimeString } from './todo-utils';

export default class TodoCountdown extends React.Component {
  render() {
    const isCountingDown = this.props.isCountingDown;
    const onStartCountdown = this.props.onStartCountdown;
    const onStopCountdown = this.props.onStopCountdown;
    const onChangeDate = this.props.onChangeDate;
    const onChangeTime = this.props.onChangeTime;

    const dueDate = this.props.dueDate;
    
    const dueDateObj = new Date(dueDate);
    const year = dueDateObj.getFullYear();
    const month = dueDateObj.getMonth() + 1;
    const date = dueDateObj.getDate();
    const hour = dueDateObj.getHours();
    const minute = dueDateObj.getMinutes();

    const dateString = formatDateString(year, month, date);
    const timeString = formatTimeString(hour, minute);

    return (
      <div className="todo-countdown">
        { !isCountingDown && <button onClick={onStartCountdown}>Start Countdown</button> }

      { isCountingDown && <input type="date" value={dateString} onChange={onChangeDate}/> }
      { isCountingDown && <input type="time" value={timeString} onChange={onChangeTime}/> }

      { isCountingDown && <TodoTimer endTime={dueDate}/> }
      { isCountingDown && <button onClick={onStopCountdown}>Stop Countdown</button> }

      </div>
    );
  }
};

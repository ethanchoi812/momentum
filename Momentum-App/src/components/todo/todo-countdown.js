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
      <div className="todo-item-elem todo-countdown">
        { !isCountingDown && <button onClick={onStartCountdown}
            title="Start countdown"
            className="todo-btn">
            <i className="fa fa-hourglass-start"></i>
          </button> }

        { isCountingDown && <div className="todo-datetime-input">
            <input className="todo-date-input"
              type="date" value={dateString} onChange={onChangeDate}/>
            <input className="todo-time-input"
              type="time" value={timeString} onChange={onChangeTime}/>
          </div> }
        { isCountingDown && <button className="todo-stop-count todo-btn"
          title="Stop countdown"
          onClick={onStopCountdown}>
          <TodoTimer endTime={dueDate}/>
        </button> }
      </div>
    );
  }
};

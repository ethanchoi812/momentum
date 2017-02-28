import React from 'react';
import { msToHumanString } from './todo-utils';

export default class TodoCountdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: this.props.endTime - Date.now()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        remainingTime: this.props.endTime - Date.now()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const remainingTime = this.state.remainingTime;

    return (
      <span>
        { remainingTime >= 1000 && `Remaining: ${msToHumanString(remainingTime)}` }
        { remainingTime < 1000 && 'No more time left!' }
      </span>
    );
  }
};

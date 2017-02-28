import React from 'react';

function msToHumanString(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
  const days = Math.floor(ms / 1000 / 60 / 60 / 24);

  const numbers = [days, hours, minutes, seconds];
  const units = ['day', 'hour', 'minute', 'second'];
  const phrases = [];

  numbers.forEach( (num, idx) => {
    if(num > 0) {
      let phrase = `${num} ${units[idx]}`;
      if(num !== 1) phrase += 's';

      phrases.push(phrase);
    }
  });

  return phrases.join(', ');
}

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

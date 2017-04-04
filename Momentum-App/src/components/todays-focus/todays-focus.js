import React from 'react';

class TodaysFocus extends React.Component {
  static propTypes = {
    todaysFocus: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  componentDidMount() {
    const needUpdate = this.props.todaysFocus.length > 1;
    if(!needUpdate) return;

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        current: (prevState.current + 1) % this.props.todaysFocus.length
      }));
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const haveFocus = this.props.todaysFocus.length > 0;
    if(!haveFocus) {
      return null;
    }

    const task = this.props.todaysFocus[this.state.current];

    return (
      <h1 className="todays-focus">
        {task}
      </h1>
    );
  }
}

export default TodaysFocus;


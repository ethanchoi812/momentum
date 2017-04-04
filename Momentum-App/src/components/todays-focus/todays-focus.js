import React from 'react';

class TodaysFocus extends React.Component {
  static propTypes = {
    todaysFocus: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    toggleOff: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const needUpdate = this.props.todaysFocus.length > 0;
      if(!needUpdate) return;

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

    const task = this.props.todaysFocus[this.state.current] ||
      this.props.todaysFocus[0];

    return (
      <div className="todays-focus">
        <h1 className="todays-focus-task">{task}</h1>
        <button type="button" onClick={this.props.toggleOff}
          className="todays-focus-close"
        ><i className="fa fa-times"></i></button>
      </div>
    );
  }
}

export default TodaysFocus;


import React from 'react';
import ReactDOM from 'react-dom';

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

  // an ugly way to force some animations
  // can install some React animation add-ons if necessary
  shouldComponentUpdate() {
    const el = ReactDOM.findDOMNode(this);
    if(!el) return true;

    el.classList.add('task-leaving');
    setTimeout(() => this.forceUpdate(), 300);
    
    return false;
  }
  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);
    if(!el) return;

    el.classList.add('task-entering');
    setTimeout(() => el.classList.remove('task-leaving'), 0);
    setTimeout(() => el.classList.remove('task-entering'), 300);
  }

  render() {
    const haveFocus = this.props.todaysFocus.length > 0;
    if(!haveFocus) {
      return null;
    }

    let task = this.props.todaysFocus[this.state.current];
    const idx = task && this.state.current || 0;
    task = task || this.props.todaysFocus[0];

    let stars;
    switch(idx) {
      case 0:
        stars = (
          <span className="todo-high-focus">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        );
        break;
      case 1:
        stars = (
          <span className="todo-mid-focus">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        );
        break;
      case 2:
      default:
        stars = (
          <span className="todo-low-focus">
            <i className="fa fa-star"></i>
          </span>
        );
    }

    const onlyOne = this.props.todaysFocus.length === 1;

    return (
      <div className="todays-focus">
        <svg className="todays-focus-cloud"
          viewBox="0 0 105 85"
          preserveAspectRatio="none"
        >
          <path className="todays-focus-cloud-path"
            d="M 25,40 
              a 20,20 1 0,0 0,40 
              h 50 
              a 20,20 1 0,0 0,-40 
              a 10,10 1 0,0 -15,-10 
              a 15,15 1 0,0 -35,10  
              z" />
        </svg>
        <div className="todays-focus-content">
          <h1 className={"todays-focus-task" + (onlyOne ? ' no-animate' : '')}>
            {stars}
            <span className="todays-focus-task-title">{task}</span>
            {stars}
          </h1>
          <button type="button" onClick={this.props.toggleOff}
            className="todays-focus-close"
          ><i className="fa fa-sun-o"></i></button>
        </div>
      </div>
    );
  }
}

export default TodaysFocus;


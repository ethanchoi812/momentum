import React from 'react';
import ReactDOM from 'react-dom';

import cloud from './cloud-data.json';
import sun from './sun-data.json';
import stars from './stars-data.json';

class TodaysFocus extends React.Component {
  static propTypes = {
    todaysFocus: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    toggleOff: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      isClosing: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
  }

  getScale() {
    return new Promise((resolve, reject) => {
      if (window.chrome && window.chrome.storage) {
        window.chrome.storage.sync.get('focusScale', data => {
          const err = window.chrome.runtime.lastError;
          if (err) return reject(err);

          const scale = parseFloat(data && data.focusScale);
          if (!scale) return reject(scale);

          return resolve(scale);
        });
      }
    });
  }

  saveScale(scale) {
    if (window.chrome && window.chrome.storage) {
      window.chrome.storage.sync.set({ focusScale: scale });
    }
  }

  handleClose() {
    if (this.state.isClosing) return;

    this.setState({ isClosing: true });
    setTimeout(() => this.props.toggleOff(), 1500);
  }

  handleWheel(evt, scale) {
    const el = ReactDOM.findDOMNode(this);
    if (scale && !el) {
      return window.requestAnimationFrame(
        () => this.handleWheel(evt, scale)
      );
    }
    if (!el) return;

    const currentScale = parseFloat(
      window.getComputedStyle(el).getPropertyValue('--scale').trim(),
    );
    if (!currentScale) return;

    let nextScale;
    if (evt) {
      const sign = evt.deltaY > 0 ? 1 : -1;
      const step = sign * 0.05;
      nextScale = currentScale + step;
      if (nextScale > 1.6 || nextScale < 0.4) return;
    } else {
      nextScale = scale;
    }

    el.style.setProperty('--scale', nextScale);
    this.saveScale(nextScale);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const needUpdate = this.props.todaysFocus.length > 0;
      if(!needUpdate) return;

      this.setState((prevState) => ({
        current: (prevState.current + 1) % this.props.todaysFocus.length
      }));
    }, 10000);

    if (!this.initialized) {
      this.initialized = true;
      this.getScale()
        .then(scale => this.handleWheel(null, scale))
        .catch(() => this.saveScale(1.00));
    }
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
    if (!el) return;

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
    const idx = (task && this.state.current) || 0;
    task = task || this.props.todaysFocus[0];

    const starPaths = stars[idx].map((star, i) => (
      <path
        className="todays-focus-star-path todays-focus-path"
        d={star.d}
        key={i}
      />
    ));
    const onlyOne = this.props.todaysFocus.length === 1;
    const mainClasses = ['todays-focus', `todays-focus-${idx}`];
    if (this.state.isClosing) {
      mainClasses.push('todays-focus-closing');
    }

    return (
      <div
        className={mainClasses.join(' ')}
        onWheel={this.handleWheel}
        title="Resize with mousewheel"
      >
        <svg className="todays-focus-svg"
          viewBox={cloud.viewBox}
        >
          {starPaths}
          <path className="todays-focus-sun-path todays-focus-path"
            onClick={this.handleClose}
            d={sun.d}
          />
          <ellipse cx={sun.cx} cy={sun.cy} rx={sun.rx} ry={sun.ry}
            className="todays-focus-sun-ellipse-path todays-focus-path"
            onClick={this.handleClose}
          />
          <path className="todays-focus-cloud-path todays-focus-path"
            d={cloud.d}
          />
        </svg>
        { !this.state.isClosing && <div className="todays-focus-content">
            <h1 className={"todays-focus-task" + (onlyOne ? ' no-animate' : '')}>
              <span className="todays-focus-task-title">{task}</span>
            </h1>
          </div>
        }
      </div>
    );
  }
}

export default TodaysFocus;


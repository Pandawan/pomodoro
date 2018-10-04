import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import Moment from 'moment';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Button from 'Components/Button';

const styles = StyleSheet.create({
  Timer: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
  },
  Content: {
    display: 'grid',
  },
});

class Timer extends Component {
  constructor(props) {
    super(props);

    const { maxTime } = this.props;
    this.state = {
      maxTime: Moment.duration(maxTime.amount, maxTime.unit).asSeconds(),
      currentTime: 0,
      running: false,
    };

    this.intervalFunction = this.intervalFunction.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.restart = this.restart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
    this.getFormattedValue = this.getFormattedValue.bind(this);
  }

  /**
   * Get a percentage value of the timer.
   */
  getPercentage() {
    const { currentTime, maxTime } = this.state;
    const exactPercentage = (currentTime / maxTime) * 100 || 0;
    return exactPercentage;
  }

  /**
   * Get a formatted value in HH:mm:ss or mm:ss of the current time
   */
  getFormattedValue() {
    const { currentTime, maxTime } = this.state;
    // Convert seconds to milliseconds as Moment Object
    const time = Moment.utc(currentTime * 1000);
    // If it's longer than 1 hour
    if (maxTime > 60 * 60) {
      // Format to HH:mm:ss
      return time.format('HH:mm:ss');
    }
    // Format to mm:ss
    return time.format('mm:ss');
  }

  /**
   * Called every second by the interval.
   * Used to update the time.
   */
  intervalFunction() {
    const { running, currentTime, maxTime } = this.state;

    // Make sure that the timer is running AND that it hasn't already exceeded the maxTime
    if (running && currentTime < maxTime) {
      const newTime = currentTime + 1;

      // Add 1 to the current time
      this.setState({
        currentTime: newTime,
      });

      // If it has reached maxTime, stop it
      if (newTime >= maxTime) {
        this.stop();
      }
    } else {
      this.setState({
        running: false,
      });
    }
  }

  /**
   * Start the timer from the startTime
   */
  start() {
    const { running } = this.state;
    // Make sure it's not currently running
    if (!running) {
      // Start an interval every second
      this.interval = setInterval(this.intervalFunction, 1000);

      // Update the state
      this.setState({
        running: true,
      });
    } else {
      throw new Error('Tried starting the timer but it was already running.');
    }
  }

  /**
   * Stop the timer but keep the current time
   */
  stop() {
    const { running } = this.state;
    // Make sure it's currently running
    if (running) {
      // Stop & clear the interval
      clearInterval(this.interval);

      // Update the state
      this.setState({
        running: false,
      });
    } else {
      throw new Error('Tried stopping the timer but it was not running.');
    }
  }

  /**
   * Stop the timer AND reset the time
   */
  reset() {
    const { running } = this.state;
    // Stop the timer if not already
    if (running) {
      this.stop();
    }
    // Reset time to 0
    this.setState({
      currentTime: 0,
    });
  }

  /**
   * Stop the timer, clear the time, and start it again.
   */
  restart() {
    // Stop and Reset
    this.reset();
    // Start the new timer
    this.start();
  }

  /**
   * Toggle the Timer state (Start/Stop)
   */
  toggle() {
    const { running } = this.state;
    if (running) {
      this.stop();
    } else {
      this.start();
    }
  }

  render() {
    const { running, currentTime } = this.state;
    return (
      <div id="Timer" className={css(styles.Timer)}>
        <div className={css(styles.Content)}>
          <CircularProgressbar
            percentage={this.getPercentage()}
            text={this.getFormattedValue()}
          />
          <p>
            Running: {running.toString()} | Timer: {currentTime}
          </p>
          <Button label="Toggle" onClick={this.toggle} />
          <Button label="Reset" onClick={this.reset} />
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  maxTime: PropTypes.shape({
    amount: PropTypes.number,
    unit: PropTypes.string,
  }),
};

Timer.defaultProps = {
  maxTime: {
    amount: 1,
    unit: 'minutes',
  },
};

export default Timer;

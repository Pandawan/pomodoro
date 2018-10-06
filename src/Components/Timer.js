import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import Moment from 'moment';

import Config, { Colors } from 'Config';

import InputField from 'Components/InputField';
import ProgressCircle from 'Components/ProgressCircle';
import TimerControls from 'Components/TimerControls';

const styles = StyleSheet.create({
  Timer: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    width: '80%',
    margin: '0 auto',
  },
  Content: {
    display: 'grid',
  },
  Title: {
    fontWeight: '500',
    fontSize: '3em',
    marginTop: 0,
    marginBottom: '0.1em',
    color: Colors.primary,
    textAlign: 'center',
  },
  CircleText: {
    fontSize: '4em',
    color: Colors.primary,
    margin: 0,
  },
  CircleInput: {
    fontWeight: 'inherit',
    fontFamily: 'inherit',
    background: 'none',
    textAlign: 'center',
    width: '100%',
    padding: 0,
    margin: 0,
    border: 0,
    ':focus': {
      color: Colors.primaryDarker,
    },
  },
});

class Timer extends Component {
  /**
   * Formats the given time (in milliseconds) to a H:mm:ss or m:ss time format
   */
  static getFormattedValueForTime(currentTime) {
    // Convert seconds to milliseconds as Moment Object
    const time = Moment.utc(currentTime * 1000);
    // If it's longer than 1 hour
    if (currentTime >= 60 * 60) {
      // Format to HH:mm:ss
      return time.format('H:mm:ss');
    }
    // Format to mm:ss
    return time.format('m:ss');
  }

  constructor(props) {
    super(props);

    // Convert the startTime into seconds
    const { startTime } = this.props;
    const startTimeAsSeconds = Moment.duration(
      startTime.amount,
      startTime.unit
    ).asSeconds();

    // Assign state startTime, currentTime, and running values
    this.state = {
      startTime: startTimeAsSeconds,
      currentTime: startTimeAsSeconds,
      running: false,
      inputValue: Timer.getFormattedValueForTime(startTimeAsSeconds),
    };

    // Create a reference to the input field
    this.inputFieldRef = React.createRef();

    // Probably want to switch to () => {} functions instead...
    this.intervalFunction = this.intervalFunction.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.restart = this.restart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getPercentageValue = this.getPercentageValue.bind(this);
    this.handleUpdateStartValue = this.handleUpdateStartValue.bind(this);
    this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Get a percentage value of the timer.
   */
  getPercentageValue() {
    const { currentTime, startTime } = this.state;
    const exactPercentage = (currentTime / startTime) * 100 || 0;
    return exactPercentage;
  }

  /**
   * Called every second by the interval.
   * Used to update the time.
   */
  intervalFunction() {
    const { running, currentTime, startTime } = this.state;

    // Make sure that the timer is running AND that it hasn't already passed 0
    if (running && currentTime > 0) {
      const newTime = currentTime - 1;
      // Add 1 to the current time
      this.setState({
        currentTime: newTime,
        inputValue: Timer.getFormattedValueForTime(newTime),
      });

      // If it has reached maxTime, stop it
      if (newTime >= startTime) {
        this.stop();
      }
    } else {
      this.stop();
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
    const { running, startTime } = this.state;
    const formattedTime = Timer.getFormattedValueForTime(startTime);
    // Stop the timer if not already
    if (running) {
      this.stop();
    }
    // Reset time to 0
    this.setState({
      currentTime: startTime,
      inputValue: formattedTime,
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

  /**
   * Called when the focus on the input field is lost.
   * Confirm the value and update the start/current times.
   * @param {string} value The InputField's value
   */
  handleUpdateStartValue(value) {
    // Stop it if currently running (shouldn't happen, just in case)
    const { running } = this.state;
    if (running) {
      this.stop();
    }

    // Whether or not the given input is in mm:ss format
    const isMinutesFormat = Moment(value, 'm:ss', true).isValid();
    // If it's not in mm:ss format AND it's not a valid duration, don't allow it!
    if (!isMinutesFormat && !Moment.isDuration(Moment.duration(value))) {
      this.setState(previousState => ({
        currentTime: previousState.currentTime,
        startTime: previousState.startTime,
        inputValue: Timer.getFormattedValueForTime(previousState.currentTime),
      }));
      return;
    }
    // Change the time to the new one
    const newTime = isMinutesFormat
      ? Moment.duration(`00:${value}`).asSeconds()
      : Moment.duration(value).asSeconds();
    // Update the time
    this.setState({
      currentTime: newTime,
      startTime: newTime,
      inputValue: Timer.getFormattedValueForTime(newTime),
    });
  }

  /**
   * Called when the value of the input field changes.
   * Update the state to reflect those changes.
   * @param {string} value The InputField's Value
   */
  handleChangeInputValue(value) {
    this.setState({
      inputValue: value,
    });
  }

  /**
   * Called when the form is submitted (Press Enter or Done or something)
   * Call handleUpdateStartValue
   * @param {Event} e The event object for the form submit
   */
  handleFormSubmit(e) {
    e.preventDefault();
    this.handleUpdateStartValue(this.inputFieldRef.current.value);
  }

  render() {
    const { running, inputValue, currentTime } = this.state;

    // Update the title
    const formattedTime = Timer.getFormattedValueForTime(currentTime);
    document.title = `(${formattedTime}) Pomodoro`;

    return (
      <div id="Timer" className={css(styles.Timer)}>
        <div className={css(styles.Content)}>
          <h1 className={css(styles.Title)}>{Config.name}</h1>
          <ProgressCircle percentage={this.getPercentageValue()}>
            {running ? (
              <p className={css(styles.CircleText)}>{formattedTime}</p>
            ) : (
              <form onSubmit={this.handleFormSubmit}>
                <InputField
                  inputRef={this.inputFieldRef}
                  className={css(styles.CircleText, styles.CircleInput)}
                  value={inputValue}
                  onBlur={this.handleUpdateStartValue}
                  onChange={this.handleChangeInputValue}
                />
              </form>
            )}
          </ProgressCircle>
          <TimerControls
            isRunning={running}
            onClickStart={this.start}
            onClickPause={this.stop}
            onClickReset={this.reset}
          />
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.shape({
    amount: PropTypes.number,
    unit: PropTypes.string,
  }),
};

Timer.defaultProps = {
  startTime: {
    amount: 25,
    unit: 'minutes',
  },
};

export default Timer;

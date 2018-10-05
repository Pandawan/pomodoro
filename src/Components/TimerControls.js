import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';

import { Colors } from 'Config';

import Button from 'Components/Button';

const styles = StyleSheet.create({
  Controls: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  Button: {
    background: 'none',
    color: Colors.primary,
    border: 'none',
    cursor: 'pointer',
    padding: '0.5em',
    ':focus': {
      outline: 'none',
      color: Colors.primaryDarker,
    },
  },
});

class TimerControls extends Component {
  render() {
    const { isRunning, onClickStart, onClickPause, onClickReset } = this.props;
    return (
      <div className={css(styles.Controls)}>
        {isRunning ? (
          <div>
            <Button
              className={css(styles.Button)}
              title="Stop"
              onClick={onClickPause}
            >
              <FontAwesomeIcon icon={faPause} size="4x" />
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className={css(styles.Button)}
              title="Start"
              onClick={onClickStart}
            >
              <FontAwesomeIcon icon={faPlay} size="4x" />
            </Button>
          </div>
        )}

        <div>
          <Button
            className={css(styles.Button)}
            title="Reset"
            onClick={onClickReset}
          >
            <FontAwesomeIcon icon={faUndo} size="4x" />
          </Button>
        </div>
      </div>
    );
  }
}

TimerControls.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  onClickStart: PropTypes.func,
  onClickPause: PropTypes.func,
  onClickReset: PropTypes.func,
};

TimerControls.defaultProps = {
  onClickStart: () => {},
  onClickPause: () => {},
  onClickReset: () => {},
};

export default TimerControls;

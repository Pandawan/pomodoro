import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

import { Colors } from 'Config';

const styles = StyleSheet.create({
  circle: {
    backgroundColor: Colors.grey,
    borderRadius: '50%',
    height: '15rem',
    position: 'relative',
    width: '15rem',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    position: 'absolute',
    top: '1em',
    left: '1em',
    bottom: '1em',
    right: '1em',
  },
  progress: {
    backgroundColor: Colors.primary,
    borderRadius: '50%',
    content: '',
    height: '100%',
    width: '100%',
    transition: 'all 0.2s ease',
  },
});

class ProgressCircle extends Component {
  constructor(props) {
    super(props);
    this.getPercentageValueStyle = this.getPercentageValueStyle.bind(this);
  }

  getPercentageValueStyle() {
    const { percentage } = this.props;

    const style = {};

    // Prepare constants for calculations
    const step = 1;
    const loops = Math.round(100 / step);
    const increment = 360 / loops;
    const half = Math.round(loops / 2);

    // Create the correct CSS Value based on the given progress
    if (percentage < half) {
      const nextDegree = `${90 + increment * percentage}deg`;
      style[`value-${percentage}`] = {
        backgroundImage: `linear-gradient(90deg, ${
          Colors.grey
        } 50%, transparent 50%, transparent), linear-gradient(${nextDegree}, ${
          Colors.primary
        } 50%, ${Colors.grey} 50%, ${Colors.grey})`,
      };
    } else {
      const nextDegree = `${-90 + increment * (percentage - half)}deg`;
      style[`value-${percentage}`] = {
        backgroundImage: `linear-gradient(${nextDegree}, ${
          Colors.primary
        } 50%, transparent 50%, transparent), linear-gradient(270deg, ${
          Colors.primary
        } 50%, ${Colors.grey} 50%, ${Colors.grey})`,
      };
    }
    return StyleSheet.create(style)[`value-${percentage}`];
  }

  render() {
    const { children } = this.props;
    return (
      <div className={css(styles.circle)}>
        <div
          className={css(
            styles.progress,
            styles.center,
            this.getPercentageValueStyle()
          )}
        >
          <div className={css(styles.content, styles.center)}>{children}</div>
        </div>
      </div>
    );
  }
}

ProgressCircle.propTypes = {
  children: PropTypes.node.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default ProgressCircle;

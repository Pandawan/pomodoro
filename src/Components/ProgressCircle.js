import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Colors } from 'Config';

const styles = StyleSheet.create({
  Container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  CircleOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
  },
  Center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Content: {
    margin: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: '0.75em',
  },
});

const progressStyles = {
  path: {
    stroke: Colors.primary,
  },
  text: {
    fill: Colors.primary,
  },
  trail: {
    stroke: Colors.grey,
  },
};

class ProgressCircle extends Component {
  render() {
    const { percentage, children, text } = this.props;
    return (
      <div id="ProgressCircle" className={css(styles.Container)}>
        <CircularProgressbar
          percentage={percentage}
          text={text}
          styles={progressStyles}
        />
        <div className={css(styles.CircleOverlay, styles.Center)}>
          <div className={css(styles.Content)}>{children}</div>
        </div>
      </div>
    );
  }
}

ProgressCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
  children: PropTypes.node,
  text: PropTypes.string,
};

ProgressCircle.defaultProps = {
  children: null,
  text: '',
};

export default ProgressCircle;

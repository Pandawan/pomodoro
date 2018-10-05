import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { className, children, title, onClick } = this.props;
    return (
      <button
        className={className}
        type="button"
        title={title}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  title: '',
  onClick: () => {},
};

export default Button;

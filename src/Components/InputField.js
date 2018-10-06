import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
  render() {
    const { value, className, onBlur, onChange } = this.props;
    return (
      <input
        className={className}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur(e.target.value)}
      />
    );
  }
}

InputField.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

InputField.defaultProps = {
  className: '',
  value: '',
  onBlur: () => {},
  onChange: () => {},
};

export default InputField;

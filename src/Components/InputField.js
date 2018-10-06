import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
  /*
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    const { onBlur } = this.props;
    // Blur when pressing enter
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
      onBlur(e.target.value);
    }
  }

  */
  render() {
    const { value, className, onBlur, onChange, inputRef } = this.props;
    return (
      <input
        className={className}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        // onKeyPress={this.handleKeyPress}
        onBlur={e => onBlur(e.target.value)}
        ref={inputRef}
      />
    );
  }
}

InputField.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

InputField.defaultProps = {
  className: '',
  value: '',
  onBlur: () => {},
  onChange: () => {},
  inputRef: null,
};

export default InputField;

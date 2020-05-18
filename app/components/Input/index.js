/**
 *
 * Input
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.input`
  outline: none;
  border: none;
  height: 40px;
  user-select: none;
  background: #ff8f3d21;
  color: #d3170b;
  font-size: 1rem;
  font-family: Futura;
  border-radius: 8px;
  padding: 10px 15px;
  transition: all 500ms ease;
  opacity: ${props => (props.show ? '1' : '0')};
`;

function Input({ className, onChange, value, placeholder, show }) {
  return (
    <Wrapper
      show={show}
      className={className}
      onChange={event => onChange(event.target.value)}
      value={value}
      placeholder={placeholder}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  show: PropTypes.bool,
};

export default memo(Input);

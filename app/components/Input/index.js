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
  text-align: center;
  border-radius: 8px;
  padding: 10px 15px;
  transition: opacity 500ms ease, all 500ms cubic-bezier(0.68, -0.6, 0.32, 1.6);
  opacity: ${props => (props.show ? '1' : '0')};
  transform: translateY(${props => (props.show ? '0px' : '-20px')});
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  }
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

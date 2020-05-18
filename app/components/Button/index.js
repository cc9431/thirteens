/**
 *
 * Button
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.button`
  border-radius: 8px;
  user-select: none;
  border: none;
  background: #ff8f3d11;
  color: #d3170b;
  font-family: Futura;
  outline: none;
  font-size: 1rem;
  padding: 10px 15px;
  min-width: 125px;
  width: fit-content;
  margin: auto;
  transition: all 500ms ease;
  :active {
    transform: translateY(2px);
  }
  :hover {
    background: #ff8f3d33;
  }
`;

function Button({ className, onClick, text, type }) {
  return (
    <Wrapper type={type || 'button'} className={className} onClick={onClick}>
      {text}
    </Wrapper>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
};

export default memo(Button);
